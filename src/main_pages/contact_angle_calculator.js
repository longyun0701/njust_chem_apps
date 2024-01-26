import React from "react";
import {useState} from "react";
const CN = 0;
//const EN = 1;
const prePath = './assets/app1/'

const shapes = ['Select a shape', 'Hemisphere', 'Cylinder', 'Truncated Cone', 'Parabola'];

function solve_hemisphere(Wn,Dn,thetaYn) {
  const d_w = Dn/Wn;
  const d2_w2 = d_w*d_w;
  const costY = Math.cos(thetaYn);
  const pi2_1_acostY = 2*Math.PI*(1-Math.abs(costY));
  const pisin2 = Math.sin(thetaYn) * Math.sin(thetaYn) * Math.PI;
  const group1 = pi2_1_acostY / (pi2_1_acostY + 4*d2_w2 -pisin2);
  const group2 = 4 / (3+d2_w2-2*d_w);

  const thetaW = group2* costY;
  const thetaCB = group1 * (costY +1) - 1;
  const thetaD = (group1 - 1) / (group2 - group1);

  return {cos_thetaW_r:thetaW, cos_thetaCB_r:thetaCB, cos_thetaD_r:thetaD};

}

function solve_cyliner(Wn,Hn,Dn,thetaYn) {

  const piw_d2 = Math.PI * Wn / Dn/Dn;
  const piw2_4d2 = piw_d2 * Wn/4;
  const costY = Math.cos(thetaYn);

  const thetaW = (1+piw_d2*Hn) * costY
  const thetaCB = piw2_4d2 * (costY +1) - 1
  const thetaD = (piw2_4d2 -1)/(1+piw_d2*Hn - piw2_4d2);

  return {cos_thetaW_r:thetaW, cos_thetaCB_r:thetaCB, cos_thetaD_r:thetaD};
}


function solve_trunc_cone(Wn,Hn,Dn,Kn,thetaYn) {

  const costY = Math.cos(thetaYn);
  const k2w2 = Kn*Kn*Wn*Wn;
  const d2 = Dn*Dn;
  const k2w2_w2 = k2w2 - Wn*Wn;
  const group1_pre = Math.sqrt((k2w2_w2/2) * (k2w2_w2/2) + Hn*Hn);
  const group1 = group1_pre * Math.PI/2*(Kn*Wn+Wn) / d2;
  const group2 = k2w2*Math.PI/4/d2;
  const group3 = Math.PI /4 * Wn*Wn/d2;

  const thetaW = (1+group2-group3 + group1) * costY;
  const thetaCB = group2 * (costY + 1) - 1;
  const thetaD = (group2 - 1) / (1+ group2 - group3 + group1 - group2);

  console.log(thetaD);
  return {cos_thetaW_r:thetaW, cos_thetaCB_r:thetaCB, cos_thetaD_r:thetaD};
}


function solve_parabola(Wn,Hn,Dn,thetaYn) {

  const costY = Math.cos(thetaYn);
  const sq_12h_wd = (12*Hn/(Wn+Dn)) * (12*Hn/(Wn+Dn));
  const group1 = 1/(1 + 6/(7 * Math.PI) * (sq_12h_wd - 0.75*Math.PI));
  const group2_pre = (Wn+Dn) * (Wn + Dn) * Math.PI / (864* Hn*Hn);
  const group2 = (Math.pow((1+sq_12h_wd),1.5)-1) * group2_pre + (4-Math.PI)/4;

  const thetaW = group2 * costY;
  const thetaCB = group1 * (costY + 1) - 1;
  const thetaD = (group1 - 1) / (group2 - group1);
  
  return {cos_thetaW_r:thetaW, cos_thetaCB_r:thetaCB, cos_thetaD_r:thetaD};
}

function solve(Wn,Hn,Dn,Kn,thetaYn_d,shape){

  const thetaYn = (thetaYn_d * Math.PI) / 180.0; // to get radian of a degree

  switch (shape){
    case 'Hemisphere': 
      return solve_hemisphere(Wn,Dn,thetaYn);
    case 'Cylinder':
      return solve_cyliner(Wn,Hn,Dn,thetaYn);
    case 'Truncated Cone':
      return solve_trunc_cone(Wn,Hn,Dn,Kn,thetaYn);
    case 'Parabola':
      return solve_parabola(Wn,Hn,Dn,thetaYn);
    default:
      return {cos_thetaW_r:-2, cos_thetaCB_r:-2, cos_thetaD_r:-2};
  }
}


function InputArea({req_vars, req_vars_setters, lang}){

  const { W, H, D, K, thetaY, shape} = req_vars;
  const {setW, setH, setD,  setK, setThetaY,setShape} = req_vars_setters;

  const thetaChange = (e) => {
    const newText = e.target.value;
    setThetaY(newText);
  };

  const WChange = (e) => {
    const newText = e.target.value;
    setW(newText);
  };

  const HChange = (e) => {
    const newText = e.target.value;
    setH(newText);
  };

  const DChange = (e) => {
    const newText = e.target.value;
    setD(newText);
  };

  const KChange = (e) => {
    const newText = e.target.value;
    setK(newText);
  };

  const handleShapeChange= (e) => {
    const newShape = e.target.value;
    setShape(newShape);
  }

  
  return(
    <div>
      <tr height='50px'>
        <td width='160px'>
            <select class='dropdownBox1' value={shape} onChange={handleShapeChange}>
              {
                shapes.map((shape0)=>{
                  return (<option value={shape0}>{shape0}</option>)
                })
              }
            </select>
        </td>

        <td width='160px'>
          <i>&theta;</i><sub>Y</sub> = <input type="number" placeholder='(0-180)' class='inputBox1' value={thetaY} onChange={thetaChange}/> <sup>o</sup>
        </td>
        <td width='160px'>
          <i>w</i> = <input type="number" placeholder='[0.1-100]' class='inputBox1' value={W} onChange={WChange}/> nm
        </td>
        <td width='160px'>
          {(shape==='Hemisphere') ? (<div><i>h</i> = <i>w</i>/2</div>) :
          <div>
            <i>h</i> = <input type="number" placeholder='[0.1-100]' class='inputBox1' value={H} onChange={HChange}/> nm
          </div>
          }
        </td>
        <td width='160px'>
          <i>d</i> = <input type="number" placeholder='[0.1-100]' class='inputBox1' value={D} onChange={DChange}/> nm
        </td>

      </tr>

      <tr height='50px'>
        <td width='160px'>          </td>
        <td width='160px'>          </td>
        <td width='160px'>
          {(shape === 'Truncated Cone') ?
           (<div>
            <i>k</i> = <input type="number" placeholder='(0-1)' class='inputBox1' value={K} onChange={KChange}/>
            </div>)
           : (null)}
        </td>
        <td width='160px'>          </td>
        <td width='160px'>          </td>

      </tr>

      <br/>
      <br/>

    </div>

  )


}

function CalculateButton({req_vars, req_vars_setters, res_vars_setters, lang}){

  const calculate = (lang===CN) ? "运行计算" : 'CALCULATE';
  const alert_cn = '请提供正确的输入参数', alert_en = "Provide correct parameters";
  const alert_info = (lang===CN) ? alert_cn : alert_en;
  const { W, H, D, K, thetaY, shape} = req_vars;
  const {setW, setH, setD, setK, setThetaY} = req_vars_setters;
  const {setThetaW, setThetaCB, setThetaD} = res_vars_setters;

  const handleCalculate = ()=>{

    let Wn = parseFloat(W), Hn = parseFloat(H), Dn = parseFloat(D), Kn = parseFloat(K), thetaYn = parseFloat(thetaY);

    if (shape===shapes[0] || isNaN(Wn) || (shape!=='Hemisphere' && isNaN(Hn)) || isNaN(Dn) || isNaN(thetaYn)) alert(alert_info);
    else if (shape==='Truncated Cone' && isNaN(Kn)) alert(alert_info); 
    else {

      if (shape==='Truncated Cone') {
        if (Kn<=0) Kn = 0.001; if (Kn>=1) Kn = 0.999;
      }
      else Kn="0<k<1";

      if (Wn<0.1) Wn=0.1; if (Wn>100) Wn=100;
      if (Hn<0.1) Hn=0.1; if (Hn>100) Hn=100;
      if (Dn<0.1) Dn=0.1; if (Dn>100) Dn=100;
      if (thetaYn<0.001) thetaYn=0.001; if (thetaYn>179.999) thetaYn=179.999; 

      const {cos_thetaW_r, cos_thetaCB_r, cos_thetaD_r} = solve(Wn,Hn,Dn,Kn,thetaYn,shape);
      const thetaW = Math.acos(cos_thetaW_r) * 180.0 /Math.PI;
      const thetaCB = Math.acos(cos_thetaCB_r) * 180.0 /Math.PI;
      const thetaD = Math.acos(cos_thetaD_r) * 180.0 /Math.PI;

      setThetaW(thetaW);
      setThetaCB(thetaCB);
      setThetaD(thetaD);

      setW(Wn); setH(Hn); setD(Dn); setK(Kn); setThetaY(thetaYn);
    }
  }


  return (
    <tr align='center'>
      <button onClick={handleCalculate}>{calculate}</button><br/><br/>
    </tr>
    );
}

function OutputArea({res_vars,lang}){

  const { thetaW, thetaCB, thetaD} = res_vars;
  //const {K} = req_vars;


  const result = (lang===CN) ? '计算结果':'RESULTS'

  function roundTheta(input,n_digits) {
    if (!isNaN(input) && typeof input === "number") {
      // Input is a valid floating-point number
      const roundedValue = parseFloat(input.toFixed(n_digits));
      return roundedValue;
    } else {
      // Input is not a valid number
      return input;
    }
  }

  const thetaW_disp = roundTheta(thetaW,3);
  const thetaCB_disp = roundTheta(thetaCB,3);
  const thetaD_disp = roundTheta(thetaD,3);

  return (
    <div>
      <tr> <th colspan='4' align='center'><br/>{result}<br/><br/></th></tr>
      <tr>
        <td width='280px'>
          <i>&theta;</i><sub>W</sub> = <input class='inputBox1' value={thetaW_disp} readonly="true"/><sup>o</sup>
        </td>
        <td width='280px'>
          <i>&theta;</i><sub>CB</sub> = <input class='inputBox1' value={thetaCB_disp} readonly="true"/><sup>o</sup>
        </td>
        <td width='280px'>
          <i>&theta;</i><sub>C</sub> = <input class='inputBox1' value={thetaD_disp} readonly="true"/><sup>o</sup>
        </td>
        <td width='60px'>
          
        </td>

      </tr>   

    </div>
  )
}


export function ContactAngle({lang}) {

  const [shape, setShape] = useState('Select a shape');
  const [thetaY, setThetaY] = useState('degree');
  const [W, setW] = useState('[0.1-100]');
  const [H, setH] = useState('[0.1-100]');
  const [D, setD] = useState('[0.1-100]');
  const [K, setK] = useState('(0,1)');

  const [thetaW, setThetaW] = useState('thetaW1');
  const [thetaCB, setThetaCB] = useState('thetaCB1');
  const [thetaD, setThetaD] = useState('thetaD1');


  const req_vars = {W: W, H:H, D:D, K:K, thetaY: thetaY, shape:shape};
  const req_vars_setters = {setW: setW, setH: setH, setD: setD, setK: setK, setThetaY: setThetaY, setShape: setShape};
  const res_vars = {thetaW: thetaW, thetaCB: thetaCB, thetaD: thetaD};
  const res_vars_setters = {setThetaW: setThetaW, setThetaCB: setThetaCB, setThetaD: setThetaD};

      
  return (
    <div>

      <img src={prePath+'App_1_Diagram.png'} width='800px' height='140px' alt='diagram'/>

      <table>
        <InputArea req_vars={req_vars} req_vars_setters={req_vars_setters} lang={lang}/>
      </table>

      <table>
        <CalculateButton req_vars={req_vars} req_vars_setters={req_vars_setters} res_vars_setters={res_vars_setters} lang={lang} />
      </table>
        <hr width='500px'color='#D8D8D8'/>

      <table>
        <OutputArea res_vars={res_vars} lang={lang}/>
      
      </table>


    </div>
  )
    }