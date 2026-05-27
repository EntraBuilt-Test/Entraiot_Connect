const fs = require('fs');
const { parse } = require('acorn');

const filepath = 'stage1/assets/Portfolio-CFTaDZT1.js';
const content = fs.readFileSync(filepath, 'utf8');

const startIdx = content.indexOf('const cardConfigs =');
const endIdx = content.indexOf(',Ut=');

console.log('Found indices:', startIdx, endIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error('Error: Could not find cardConfigs or Ut= in file');
  process.exit(1);
}

const newCode = `const cardConfigs = [
  { abbr: "C S", image: "/portfolio/image/management.webp", metrics: [{ val: "98.5%", label: "Efficiency" }, { val: "A+", label: "Synergy" }, { val: "42", label: "Active Projs" }] },
  { abbr: "G O", image: "/portfolio/image/marketing.webp", metrics: [{ val: "4.8x", label: "Avg ROAS" }, { val: "18", label: "Campaigns" }, { val: "8.4M", label: "Monthly Imp" }] },
  { abbr: "E R", image: "/portfolio/image/technical.webp", metrics: [{ val: "99.99%", label: "Uptime" }, { val: "94 Pts", label: "Velocity" }, { val: "AAA", label: "Security" }] },
  { abbr: "O F", image: "/portfolio/image/financial.webp", metrics: [{ val: "34.2%", label: "Margin" }, { val: "100%", label: "Audit Pass" }, { val: "$4.2M", label: "Asset Val" }] },
  { abbr: "S S", image: "/portfolio/image/client_portal.webp", metrics: [{ val: "4.92/5", label: "CSAT" }, { val: "<15m", label: "SLA Response" }, { val: "97.8%", label: "Retention" }] }
];
const Bt=e=>{
  const{mesh:t}=xe(G),{size:r,viewport:i}=te(d=>d),a=tt(),l=E.useRef(null),n=E.useRef(null),o=E.useRef(null),c=E.useRef(null),s=nt("image/" + e.reference + ".webp");
  s.wrapS=s.wrapT=Ie,s.generateMipmaps=!1;
  const config = cardConfigs[e.index] || cardConfigs[0];
  const handleMouseMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rx = -(y - yc) / yc * 15;
    const ry = (x - xc) / xc * 15;
    card.style.setProperty("--rx", rx + "deg");
    card.style.setProperty("--ry", ry + "deg");
  };
  const handleMouseLeave = (event) => {
    const card = event.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };
  return E.useLayoutEffect(()=>{o.current&&(o.current.toneMapped=!1,o.current.transparent=!0,o.current.depthTest=o.current.depthWrite=!1)},[o]),ye((d,m)=>{if(!o.current?.uniforms)return;const w=n.current.position.x-t.size.x/2+r.width/2,D=w<r.width,b=(1-w/r.width)*t.friction;o.current.uniforms.uOffset.value=b,n.current.userData.onHovered?fe(o.current.uniforms.uHoverProgress,"value",.4,.25,m):fe(o.current.uniforms.uHoverProgress,"value",0,.4,m),o.current.uniforms.uIsFrustrum.value=D,o.current.uniforms.uDeltaPosition.value=B?0:Pe}),S.jsx("group",{"position-y":B||i.aspect>1.8?50:180,children:S.jsxs("mesh",{ref:n,...e,onPointerEnter:()=>n.current.userData.onHovered=!0,onPointerLeave:()=>n.current.userData.onHovered=!1,children:[S.jsx("roundedPlaneGeometry",{ref:l,args:[t.size.x,t.size.y,t.borderRadius]}),S.jsx("portfolioItemMaterial",{ref:o,uTexture:s,uColor:t.fadeColor,uIsFrustrum:!1,uResolution:t.size,uDeltaPosition:e.deltaPosition}),
  S.jsx(st,{
    center:!0,
    wrapperClass:"__html portfolio-item dept-" + (e.index + 1),
    style:{width:t.size.x + "px",height:t.size.y + "px"},
    children: S.jsxs("div", {
      className: "portfolio-card-inner",
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      children: [
        S.jsx("div", { className: "card-cyber-grid" }),
        S.jsx("div", { className: "card-glare" }),
        S.jsx("div", { className: "card-radar-backdrop" }),
        S.jsx("div", { className: "card-scanline" }),
        S.jsxs("div", {
          className: "card-header-info",
          children: [
            S.jsx("div", { className: "card-dept-title", children: e.title }),
            S.jsx("div", { className: "card-dept-role", children: e.tech })
          ]
        }),
        S.jsx("div", { className: "card-bg-text-overlay", children: config.abbr }),
        S.jsx("div", {
          className: "card-car-overlay",
          children: S.jsx("img", { className: "car-render-img", src: config.image })
        }),
        S.jsx("p", { className: "card-desc", children: e.desc }),
        S.jsxs("div", {
          className: "card-metrics-row",
          children: config.metrics.map((met, mIdx) => S.jsxs("div", {
            className: "card-metric-block",
            children: [
              S.jsx("div", { className: "card-metric-value", children: met.val }),
              S.jsx("div", { className: "card-metric-label", children: met.label })
            ]
          }, mIdx))
        }),
        S.jsx("a", {
          href: e.url,
          className: "card-action-btn",
          children: S.jsx("span", { className: "btn-txt-default", children: "LOGIN" })
        })
      ]
    })
  })]})})}`;

const modified = content.substring(0, startIdx) + newCode + content.substring(endIdx);

try {
  parse(modified, { ecmaVersion: 2022, sourceType: 'module' });
  console.log('SUCCESS: Code modified is 100% syntactically correct!');
  fs.writeFileSync('stage1/assets/Portfolio-CFTaDZT1.js', modified);
  console.log('SUCCESS: Written changes to stage1/assets/Portfolio-CFTaDZT1.js');
  
  // Also copy to dist-vercel
  const distFile = 'dist-vercel/portfolio/assets/Portfolio-CFTaDZT1.js';
  const distContent = fs.readFileSync(distFile, 'utf8');
  const distStartIdx = distContent.indexOf('const cardConfigs =');
  const distEndIdx = distContent.indexOf(',Ut=');
  const distModified = distContent.substring(0, distStartIdx) + newCode + distContent.substring(distEndIdx);
  
  parse(distModified, { ecmaVersion: 2022, sourceType: 'module' });
  fs.writeFileSync(distFile, distModified);
  console.log('SUCCESS: Written changes to dist-vercel/portfolio/assets/Portfolio-CFTaDZT1.js');
} catch (err) {
  console.error('PARSING ERROR:', err.message);
  process.exit(1);
}
