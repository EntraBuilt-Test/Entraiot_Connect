import{aM as p,aK as e,aI as B,am as f}from"./index-Do2HjHOR.js";
import{u as A,a as c,j as C}from"./Scene-C8_wfzCq.js";

const i=({position:r=[],rotation:n=[]})=>{
  const{nodes:a}=c(p.getState().lu_glb_path),{windmill:t}=a,s=B.useRef(null),u=Math.random()*.01+.005;
  return f(()=>{s.current&&(s.current.rotation.y+=u)}),e.jsx("mesh",{geometry:t.geometry,material:t.material,position:r.length?r:t.position.toArray(),rotation:n.length?n:t.rotation.toArray(),children:e.jsx("mesh",{ref:s,geometry:t.children[0].geometry,material:t.children[0].material,position:t.children[0].position.toArray(),rotation:t.children[0].rotation.toArray()},t.children[0].uuid)})
};

const E=()=>{
  const{isMobile:r}=A(),{nodes:n}=c(p.getState().lu_glb_path),{buildingsLuxembourg:a,catedralBridgeBCE:t,foliage:s,gelleFra:u,myWorksText:l}=n,x=[a.getObjectByName("buildingsLuxembourg_1"),a.getObjectByName("buildingsLuxembourg_2")],b=[t.getObjectByName("catedralBridgeBCE_1"),t.getObjectByName("catedralBridgeBCE_2")],j=r?"luxembourg-buildings@mobile.webp":"luxembourg-buildings.webp",y=r?"luxembourg-bcbce@mobile.webp":"luxembourg-bcbce.webp",[d,g]=C([`texture/${j}`,`texture/${y}`]);
  d.flipY=g.flipY=!1;

  const text="OUR WORK";
  const voxelSize=0.326;
  const minX=-11.524;
  const maxX=15.646;
  const minY=-11.831;
  const maxY=13.466;
  const minZ=-5.278;
  const maxZ=0.271;
  const widthVoxels=Math.round((maxX-minX)/voxelSize);
  const heightVoxels=Math.round((maxY-minY)/voxelSize);

  const canvas=document.createElement("canvas");
  canvas.width=widthVoxels;
  canvas.height=heightVoxels;
  const ctx=canvas.getContext("2d");
  ctx.fillStyle="#000000";
  ctx.fillRect(0,0,widthVoxels,heightVoxels);
  ctx.save();

  const targetWidth=widthVoxels-6;
  const fontSize=50;
  ctx.font=fontSize+"px Arial, sans-serif";
  let textWidth=ctx.measureText(text).width;
  if(!textWidth||textWidth<10){
    textWidth=text.length*fontSize*0.55;
  }
  const scaleX=targetWidth/textWidth;

  ctx.translate(widthVoxels/2,heightVoxels/2);
  ctx.scale(scaleX,1);
  ctx.fillStyle="#ffffff";
  ctx.textAlign="center";
  ctx.textBaseline="middle";
  ctx.fillText(text,0,0);
  ctx.restore();

  const imgData=ctx.getImageData(0,0,widthVoxels,heightVoxels);
  const data=imgData.data;

  const voxels=[];
  for(let row=0;row<heightVoxels;row++){
    for(let col=0;col<widthVoxels;col++){
      const idx=(row*widthVoxels+col)*4;
      if(data[idx]>127){
        voxels.push({
          x:minX+col*voxelSize+voxelSize/2,
          y:maxY-row*voxelSize-voxelSize/2,
          z:(minZ+maxZ)/2
        });
      }
    }
  }

  const halfX=voxelSize/2;
  const halfY=voxelSize/2;
  const halfZ=0.75;
  const baseVertices=[-halfX,-halfY,halfZ,halfX,-halfY,halfZ,halfX,halfY,halfZ,-halfX,halfY,halfZ,-halfX,-halfY,-halfZ,-halfX,halfY,-halfZ,halfX,halfY,-halfZ,halfX,-halfY,-halfZ,-halfX,halfY,-halfZ,-halfX,halfY,halfZ,halfX,halfY,halfZ,halfX,halfY,-halfZ,-halfX,-halfY,-halfZ,halfX,-halfY,-halfZ,halfX,-halfY,halfZ,-halfX,-halfY,halfZ,halfX,-halfY,-halfZ,halfX,halfY,-halfZ,halfX,halfY,halfZ,halfX,-halfY,halfZ,-halfX,-halfY,-halfZ,-halfX,-halfY,halfZ,-halfX,halfY,halfZ,-halfX,halfY,-halfZ];
  const baseIndices=[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23];
  const N_vox=voxels.length;
  const mergedVertices=new Float32Array(N_vox*24*3);
  const mergedIndices=new Uint16Array(N_vox*36);

  for(let k=0;k<N_vox;k++){
    const voxel=voxels[k];
    const vOffset=k*24*3;
    const iOffset=k*36;
    const indexVertexOffset=k*24;
    for(let vi=0;vi<24;vi++){
      mergedVertices[vOffset+vi*3+0]=baseVertices[vi*3+0]+voxel.x;
      mergedVertices[vOffset+vi*3+1]=baseVertices[vi*3+1]+voxel.y;
      mergedVertices[vOffset+vi*3+2]=baseVertices[vi*3+2]+voxel.z;
    }
    for(let ii=0;ii<36;ii++){
      mergedIndices[iOffset+ii]=baseIndices[ii]+indexVertexOffset;
    }
  }

  const BufferGeometry=l.geometry.constructor;
  const BufferAttribute=l.geometry.attributes.position.constructor;
  const customGeometry=new BufferGeometry();
  customGeometry.setAttribute("position",new BufferAttribute(mergedVertices,3));
  customGeometry.setIndex(new BufferAttribute(mergedIndices,1));
  customGeometry.computeVertexNormals();

  l.material.side=2;

  return e.jsxs("group",{name:"buildingsLuxembourg",position:a.position.toArray(),children:[
    e.jsx("mesh",{geometry:customGeometry,material:l.material,position:[l.position.x,l.position.y+1.0,l.position.z],rotation:[0,l.rotation.y-Math.PI/2,0]}),
    x.map((o,h)=>e.jsx("mesh",{geometry:o.geometry,onUpdate:m=>m.matrixAutoUpdate=!1,children:e.jsx("meshBasicMaterial",{map:d,toneMapped:!1})},o.uuid)),
    b.map((o,h)=>e.jsx("mesh",{geometry:o.geometry,onUpdate:m=>m.matrixAutoUpdate=!1,children:e.jsx("meshBasicMaterial",{map:g,toneMapped:!1})},o.uuid)),
    e.jsx("primitive",{object:u,"material-roughness":.2,onUpdate:o=>o.matrixAutoUpdate=!1}),
    e.jsx("primitive",{object:s,onUpdate:o=>o.matrixAutoUpdate=!1}),
    e.jsx(i,{}),
    e.jsx(i,{position:[288,0,-126],rotation:[0,50,0]}),
    e.jsx(i,{position:[360,0,-222],rotation:[0,55,0]}),
    e.jsx(i,{position:[125,0,180],rotation:[0,47,0]}),
    e.jsx(i,{position:[101,0,259],rotation:[0,10.5,0]}),
    e.jsx(i,{position:[1,0,330],rotation:[0,-2.8,0]})
  ]})
};

export{E as default};
