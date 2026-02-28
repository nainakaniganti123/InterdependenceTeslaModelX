import { useState, useRef } from 'react';
import DetailPanel from './DetailPanel';
import { steps, impactData, sectorSummary } from '../../../mocks/mindMapData';

type NodeType = 'center' | 'sector' | 'step' | 'impact' | 'intro';

interface MindNode {
  id: string;
  type: NodeType;
  label: string;
  sublabel?: string;
  color: string;
  textColor: string;
  icon: string;
  x: number;
  y: number;
  radius: number;
  parentId?: string;
  data?: unknown;
}

const W = 1400;
const H = 900;
const CX = W / 2;
const CY = H / 2;

function buildNodes(): MindNode[] {
  const nodes: MindNode[] = [];

  // Center
  nodes.push({
    id: 'center',
    type: 'center',
    label: 'Tesla Model X',
    sublabel: 'Interdependence',
    color: '#111827',
    textColor: '#ffffff',
    icon: 'ri-car-line',
    x: CX,
    y: CY,
    radius: 72,
  });

  // Sector branches
  const sectors = [
    { id: 'primary', label: 'Primary', sublabel: 'Raw Materials', color: '#059669', textColor: '#fff', icon: 'ri-plant-line', angle: 200 },
    { id: 'secondary', label: 'Secondary', sublabel: 'Manufacturing', color: '#d97706', textColor: '#fff', icon: 'ri-tools-line', angle: 320 },
    { id: 'tertiary', label: 'Tertiary', sublabel: 'Services', color: '#e11d48', textColor: '#fff', icon: 'ri-service-line', angle: 90 },
    { id: 'impact', label: 'Disruption', sublabel: 'What If?', color: '#7c3aed', textColor: '#fff', icon: 'ri-alert-line', angle: 0 },
    { id: 'intro', label: 'Overview', sublabel: 'Interdependence', color: '#0891b2', textColor: '#fff', icon: 'ri-global-line', angle: 150 },
  ];

  const sectorDist = 230;
  sectors.forEach((s) => {
    const rad = (s.angle * Math.PI) / 180;
    nodes.push({
      id: s.id,
      type: s.id === 'impact' ? 'impact' : s.id === 'intro' ? 'intro' : 'sector',
      label: s.label,
      sublabel: s.sublabel,
      color: s.color,
      textColor: s.textColor,
      icon: s.icon,
      x: CX + sectorDist * Math.cos(rad),
      y: CY + sectorDist * Math.sin(rad),
      radius: 52,
      parentId: 'center',
    });
  });

  // Step nodes around sectors
  const primarySteps = steps.filter((s) => s.sector === 'primary');
  const secondarySteps = steps.filter((s) => s.sector === 'secondary');
  const tertiarySteps = steps.filter((s) => s.sector === 'tertiary');

  const sectorNode = (id: string) => nodes.find((n) => n.id === id)!;

  const placeChildren = (parentId: string, children: typeof steps, spreadAngle: number, dist: number) => {
    const parent = sectorNode(parentId);
    const parentAngle = Math.atan2(parent.y - CY, parent.x - CX) * (180 / Math.PI);
    const half = (spreadAngle * (children.length - 1)) / 2;
    children.forEach((step, i) => {
      const angle = parentAngle + (i * spreadAngle - half);
      const rad = (angle * Math.PI) / 180;
      nodes.push({
        id: `step-${step.step}`,
        type: 'step',
        label: step.title,
        sublabel: step.flag + ' ' + step.location.split(',')[0],
        color: parentId === 'primary' ? '#d1fae5' : parentId === 'secondary' ? '#fef3c7' : '#ffe4e6',
        textColor: parentId === 'primary' ? '#065f46' : parentId === 'secondary' ? '#78350f' : '#9f1239',
        icon: 'ri-map-pin-line',
        x: parent.x + dist * Math.cos(rad),
        y: parent.y + dist * Math.sin(rad),
        radius: 38,
        parentId,
        data: step,
      });
    });
  };

  placeChildren('primary', primarySteps, 28, 190);
  placeChildren('secondary', secondarySteps, 26, 195);
  placeChildren('tertiary', tertiarySteps, 40, 185);

  return nodes;
}

const allNodes = buildNodes();

function getEdges(nodes: MindNode[]) {
  return nodes
    .filter((n) => n.parentId)
    .map((n) => {
      const parent = nodes.find((p) => p.id === n.parentId)!;
      return { from: parent, to: n, color: parent.color };
    });
}

export default function MindMapCanvas() {
  const [selected, setSelected] = useState<MindNode | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [panelOpen, setPanelOpen] = useState(false);
  const [expandedSectors, setExpandedSectors] = useState<Set<string>>(new Set(['primary', 'secondary', 'tertiary', 'impact', 'intro']));
  const svgRef = useRef<SVGSVGElement>(null);

  const visibleNodes = allNodes.filter((n) => {
    if (n.type === 'center') return true;
    if (n.type === 'sector' || n.type === 'impact' || n.type === 'intro') return true;
    if (n.type === 'step') return expandedSectors.has(n.parentId!);
    return true;
  });

  const edges = getEdges(visibleNodes);

  const handleNodeClick = (node: MindNode) => {
    if (node.type === 'sector' || node.type === 'center') {
      if (node.type === 'sector') {
        setExpandedSectors((prev) => {
          const next = new Set(prev);
          if (next.has(node.id)) next.delete(node.id);
          else next.add(node.id);
          return next;
        });
      }
      setSelected(node);
      setVisited((prev) => new Set(prev).add(node.id));
      setPanelOpen(true);
    } else {
      setSelected(node);
      setVisited((prev) => new Set(prev).add(node.id));
      setPanelOpen(true);
    }
  };

  const closePanel = () => {
    setPanelOpen(false);
    setTimeout(() => setSelected(null), 350);
  };

  const visitedCount = visited.size;
  const totalCount = allNodes.length;

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden select-none">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
        <div>
          <h1 className="text-base font-extrabold text-gray-900 leading-tight">Tesla Model X — Illustration of Interdependence</h1>
          <p className="text-xs text-gray-500">Click any node to explore · Click sector nodes to expand/collapse steps</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {[
              { color: 'bg-emerald-500', label: 'Primary' },
              { color: 'bg-amber-500', label: 'Secondary' },
              { color: 'bg-rose-500', label: 'Tertiary' },
              { color: 'bg-violet-600', label: 'Disruption' },
              { color: 'bg-cyan-600', label: 'Overview' },
            ].map((l) => (
              <span key={l.label} className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                <span className={`w-2 h-2 rounded-full ${l.color} inline-block`}></span>
                {l.label}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-checkbox-circle-line text-teal-600 text-sm"></i>
            </div>
            <span className="text-xs font-bold text-gray-700">{visitedCount}/{totalCount} explored</span>
          </div>
        </div>
      </div>

      {/* SVG Mind Map */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full"
        style={{ marginTop: 0 }}
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.12" />
          </filter>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#fff" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Edges */}
        {edges.map((e, i) => (
          <line
            key={i}
            x1={e.from.x}
            y1={e.from.y}
            x2={e.to.x}
            y2={e.to.y}
            stroke={e.color}
            strokeWidth={e.to.type === 'step' ? 1.5 : 2.5}
            strokeOpacity={e.to.type === 'step' ? 0.35 : 0.5}
            strokeDasharray={e.to.type === 'step' ? '5,4' : undefined}
          />
        ))}

        {/* Nodes */}
        {visibleNodes.map((node) => {
          const isSelected = selected?.id === node.id;
          const isVisited = visited.has(node.id);
          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              onClick={() => handleNodeClick(node)}
              style={{ cursor: 'pointer' }}
            >
              {/* Glow ring for selected */}
              {isSelected && (
                <circle
                  r={node.radius + 10}
                  fill="none"
                  stroke={node.color}
                  strokeWidth={3}
                  strokeOpacity={0.4}
                  filter="url(#glow)"
                />
              )}

              {/* Main circle */}
              <circle
                r={node.radius}
                fill={node.type === 'step' ? node.color : node.color}
                stroke={isSelected ? '#fff' : 'rgba(255,255,255,0.6)'}
                strokeWidth={isSelected ? 3 : 1.5}
                filter="url(#shadow)"
                style={{ transition: 'r 0.2s' }}
              />

              {/* Visited checkmark */}
              {isVisited && node.type !== 'center' && (
                <g transform={`translate(${node.radius - 10}, ${-node.radius + 10})`}>
                  <circle r={9} fill="#10b981" stroke="#fff" strokeWidth={1.5} />
                  <text textAnchor="middle" dominantBaseline="central" fontSize={10} fill="#fff" fontWeight="bold">✓</text>
                </g>
              )}

              {/* Icon */}
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={node.type === 'center' ? 28 : node.type === 'step' ? 14 : 22}
                fill={node.type === 'step' ? node.textColor : node.textColor}
                y={node.type === 'center' ? -14 : node.type === 'step' ? -10 : -10}
                style={{ fontFamily: 'remixicon', pointerEvents: 'none' }}
              >
              </text>

              {/* Label */}
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={node.type === 'center' ? 13 : node.type === 'step' ? 9 : 11}
                fontWeight={node.type === 'center' ? '800' : '700'}
                fill={node.type === 'step' ? node.textColor : node.textColor}
                y={node.type === 'center' ? 8 : node.type === 'step' ? 4 : 6}
                style={{ pointerEvents: 'none' }}
              >
                {node.label.length > 14 ? node.label.slice(0, 13) + '…' : node.label}
              </text>

              {/* Sublabel */}
              {node.sublabel && node.type !== 'step' && (
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={9}
                  fill={node.textColor}
                  fillOpacity={0.75}
                  y={node.type === 'center' ? 22 : 20}
                  style={{ pointerEvents: 'none' }}
                >
                  {node.sublabel}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Detail Panel */}
      <DetailPanel
        node={selected}
        open={panelOpen}
        onClose={closePanel}
        steps={steps}
        impactData={impactData}
        sectorSummary={sectorSummary}
      />

      {/* Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/80 backdrop-blur rounded-full px-4 py-2 text-xs text-gray-500 shadow border border-gray-200">
        <i className="ri-cursor-line mr-1"></i>Click any node to explore details
      </div>
    </div>
  );
}
