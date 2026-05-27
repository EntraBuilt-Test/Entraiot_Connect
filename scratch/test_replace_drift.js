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
  { abbr: "C S", carImage: "/portfolio/image/car_orange.png", maxSpeed: "302 MPH", zeroToHundred: "2.3s", power: "350 KW" },
  { abbr: "G O", carImage: "/portfolio/image/car_purple.png", maxSpeed: "285 MPH", zeroToHundred: "2.6s", power: "320 KW" },
  { abbr: "E R", carImage: "/portfolio/image/car_green.png", maxSpeed: "320 MPH", zeroToHundred: "1.9s", power: "400 KW" },
  { abbr: "O F", carImage: "/portfolio/image/car_teal.png", maxSpeed: "290 MPH", zeroToHundred: "2.5s", power: "310 KW" },
  { abbr: "S S", carImage: "/portfolio/image/car_red.png", maxSpeed: "310 MPH", zeroToHundred: "2.1s", power: "380 KW" }
];
const Bt=e=>{
  const{mesh:t}=xe(G),{size:r,viewport:i}=te(d=>d),a=tt(),l=E.useRef(null),n=E.useRef(null),o=E.useRef(null),c=E.useRef(null),s=nt("image/" + e.reference + ".webp");
  s.wrapS=s.wrapT=Ie,s.generateMipmaps=!1;
  const config = cardConfigs[e.index] || cardConfigs[0];
  const particlesRef = E.useRef([]);
  const smokeCanvasRef = E.useRef(null);
  
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
  return E.useLayoutEffect(()=>{o.current&&(o.current.toneMapped=!1,o.current.transparent=!0,o.current.depthTest=o.current.depthWrite=!1)},[o]),ye((d,m)=>{
    if(!o.current?.uniforms)return;
    const w=n.current.position.x-t.size.x/2+r.width/2,D=w<r.width,b=(1-w/r.width)*t.friction;
    o.current.uniforms.uOffset.value=b;
    n.current.userData.onHovered?fe(o.current.uniforms.uHoverProgress,"value",.4,.25,m):fe(o.current.uniforms.uHoverProgress,"value",0,.4,m);
    o.current.uniforms.uIsFrustrum.value=D;
    o.current.uniforms.uDeltaPosition.value=B?0:Pe;
    
    // Live Smoke Particles Simulation Loop
    if (smokeCanvasRef.current) {
      const canv = smokeCanvasRef.current;
      const ctx2 = canv.getContext("2d");
      if (canv.width !== canv.clientWidth || canv.height !== canv.clientHeight) {
        canv.width = canv.clientWidth;
        canv.height = canv.clientHeight;
      }
      ctx2.clearRect(0, 0, canv.width, canv.height);
      
      const hovered = n.current.userData.onHovered;
      if (hovered) {
        // Spawn smoke from rear tire (around left: 23%, bottom: 33%)
        if (Math.random() < 0.45) {
          particlesRef.current.push({
            x: canv.width * 0.23,
            y: canv.height * 0.44,
            vx: -1.2 - Math.random() * 2.2, // drift backwards
            vy: -0.2 - Math.random() * 0.5, // float upwards/downwards
            size: 5 + Math.random() * 9,
            alpha: 0.7 + Math.random() * 0.3,
            life: 0,
            maxLife: 25 + Math.random() * 15
          });
        }
        // Spawn smoke from front tire (around left: 75%, bottom: 33%)
        if (Math.random() < 0.25) {
          particlesRef.current.push({
            x: canv.width * 0.75,
            y: canv.height * 0.44,
            vx: -1.0 - Math.random() * 2.0,
            vy: -0.2 - Math.random() * 0.5,
            size: 4 + Math.random() * 7,
            alpha: 0.6 + Math.random() * 0.3,
            life: 0,
            maxLife: 20 + Math.random() * 10
          });
        }
      }
      
      // Update and draw active particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.25; // expand
        p.life++;
        const curAlpha = p.alpha * (1 - p.life / p.maxLife);
        
        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
        } else {
          ctx2.beginPath();
          let grad = ctx2.createRadialGradient(p.x, p.y, p.size * 0.1, p.x, p.y, p.size);
          grad.addColorStop(0, "rgba(225, 225, 225, " + (curAlpha * 0.35) + ")");
          grad.addColorStop(0.5, "rgba(180, 180, 180, " + (curAlpha * 0.12) + ")");
          grad.addColorStop(1, "rgba(180, 180, 180, 0)");
          ctx2.fillStyle = grad;
          ctx2.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx2.fill();
        }
      }
    }
  }),S.jsx("group",{"position-y":B||i.aspect>1.8?50:180,children:S.jsxs("mesh",{ref:n,...e,onPointerEnter:()=>n.current.userData.onHovered=!0,onPointerLeave:()=>n.current.userData.onHovered=!1,children:[S.jsx("roundedPlaneGeometry",{ref:l,args:[t.size.x,t.size.y,t.borderRadius]}),S.jsx("portfolioItemMaterial",{ref:o,uTexture:s,uColor:t.fadeColor,uIsFrustrum:!1,uResolution:t.size,uDeltaPosition:e.deltaPosition}),
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
        S.jsxs("div", {
          className: "card-car-overlay",
          children: [
            S.jsx("img", { className: "car-render-img", src: config.carImage }),
            S.jsx("div", {
              className: "card-car-wheel",
              style: { left: '19.5%', bottom: '9%', width: '42px', height: '42px' },
              children: S.jsx("svg", {
                className: "wheel-spoke-svg",
                viewBox: "0 0 100 100",
                children: S.jsxs("g", {
                  stroke: "currentColor",
                  strokeWidth: "2",
                  fill: "none",
                  children: [
                    S.jsx("circle", { cx: "50", cy: "50", r: "45" }),
                    S.jsx("circle", { cx: "50", cy: "50", r: "10", strokeWidth: "3" }),
                    S.jsx("line", { x1: "50", y1: "5", x2: "50", y2: "95" }),
                    S.jsx("line", { x1: "5", y1: "50", x2: "95", y2: "50" }),
                    S.jsx("line", { x1: "18", y1: "18", x2: "82", y2: "82", strokeWidth: "1.5" }),
                    S.jsx("line", { x1: "18", y1: "82", x2: "82", y2: "18", strokeWidth: "1.5" })
                  ]
                })
              })
            }),
            S.jsx("div", {
              className: "card-car-wheel",
              style: { left: '73.5%', bottom: '9%', width: '42px', height: '42px' },
              children: S.jsx("svg", {
                className: "wheel-spoke-svg",
                viewBox: "0 0 100 100",
                children: S.jsxs("g", {
                  stroke: "currentColor",
                  strokeWidth: "2",
                  fill: "none",
                  children: [
                    S.jsx("circle", { cx: "50", cy: "50", r: "45" }),
                    S.jsx("circle", { cx: "50", cy: "50", r: "10", strokeWidth: "3" }),
                    S.jsx("line", { x1: "50", y1: "5", x2: "50", y2: "95" }),
                    S.jsx("line", { x1: "5", y1: "50", x2: "95", y2: "50" }),
                    S.jsx("line", { x1: "18", y1: "18", x2: "82", y2: "82", strokeWidth: "1.5" }),
                    S.jsx("line", { x1: "18", y1: "82", x2: "82", y2: "18", strokeWidth: "1.5" })
                  ]
                })
              })
            })
          ]
        }),
        S.jsx("canvas", { ref: smokeCanvasRef, className: "card-smoke-canvas" }),
        S.jsx("div", { className: "card-drift-text", children: "LET'S GO!" }),
        S.jsxs("div", {
          className: "card-draft-lines",
          children: [
            S.jsx("div", { className: "draft-line l1" }),
            S.jsx("div", { className: "draft-line l2" }),
            S.jsx("div", { className: "draft-line l3" })
          ]
        }),
        S.jsx("p", { className: "card-desc", children: e.desc }),
        S.jsxs("div", {
          className: "card-metrics-row",
          children: [
            S.jsxs("div", {
              className: "card-metric-block",
              children: [
                S.jsx("div", { className: "card-metric-value", children: config.maxSpeed }),
                S.jsx("div", { className: "card-metric-label", children: "Max Speed" })
              ]
            }),
            S.jsxs("div", {
              className: "card-metric-block",
              children: [
                S.jsx("div", { className: "card-metric-value", children: config.zeroToHundred }),
                S.jsx("div", { className: "card-metric-label", children: "0-100 KMPH" })
              ]
            }),
            S.jsxs("div", {
              className: "card-metric-block",
              children: [
                S.jsx("div", { className: "card-metric-value", children: config.power }),
                S.jsx("div", { className: "card-metric-label", children: "Power" })
              ]
            })
          ]
        }),
        S.jsx("a", {
          href: e.url,
          className: "card-action-btn",
          children: S.jsx("span", { className: "btn-txt-default", children: "EXPLORE PORTAL" })
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
