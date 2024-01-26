import React from "react";

import {ContactAngle} from "./main_pages/contact_angle_calculator.js"
import {useState} from "react";

const CN = 0, EN = 1;


const applist = { "ContactAngle": { name_cn: '接触角计算',
                                    name_en: 'Contact Angle Calculator',
                                    inner: 'ContactAngle',
                                  },
                  "PlaceHolderApp": { name_cn: "占位用",
                                   name_en: "Place Holder",
                                   inner: 'PlaceHolderApp'},
                }

function GraphicPageTitle({onClickLangFuncs,lang}) {
  const title_en = "Nanjing University of Science & Technology: Apps for digital exploring";
  const title_cn = "南京理工大学 数字探究小程序";
  const title = (lang===CN)? title_cn:title_en;
  const applist_use = [applist.ContactAngle, applist.PlaceHolderApp, applist.PlaceHolderApp];

  return (
    <div>
      
    <tr class='tr1'>
      <td width='700px'> <h1b color="black">  {title} </h1b> </td> 
      <td width='100px' align="right"><lang> <div class="highlight_shift" onClick={onClickLangFuncs[0]}>简体中文</div>
                               <div class="highlight_shift" onClick={onClickLangFuncs[1]}>English</div></lang></td>
    </tr>

    <tr>
        <select  class='dropdownBox1' value={'Option 1'}>
          {
            applist_use.map((app0)=>{
              const name = (lang===CN) ? app0.name_cn : app0.name_en;
              const inner = app0.inner;
              return (<option value={inner}>{name}</option>)
            })

          }

        </select>

    </tr>


    </div>
  )
}

function FootNote({lang}) {


  const footnote_cn = 'Copyright © 2024 南京理工大学 材料科学与工程学院 兰司-安蓉 课题组 版权所有';
  const footnote_en = "Copyright © 2024 Lan&An's Group, School of Mater. Sci & Eng, NJUST";

  const declare_cn = '本应用程序只能用于非盈利的教学目的'
  const declare_en = 'For non-profitable educational purpose only'

  const footnote = (lang===CN)? footnote_cn:footnote_en;
  const declare = (lang===CN)? declare_cn:declare_en;

  return (
    <tr>

      {declare}
      <br/>
      {footnote}
    </tr>


  )


}

export default function HomePage(){

  const [showAppState, setAppState] = useState('ContactAngle');
  const [lang, setLang] = useState(EN);

  const onClickLangFuncs = [()=>{setLang(CN)}, ()=>{setLang(EN)}];

  const apps = {'ContactAngle': <ContactAngle lang={lang}/>}
  
  return (
    <div>
      <table width="800px">
        <tr><GraphicPageTitle onClickLangFuncs={onClickLangFuncs} lang={lang}/></tr>
        <br/>
        <tr>{apps[showAppState]}</tr>
        <br/>
        <tr><FootNote lang={lang}/></tr>
      </table>  

    </div>
  )
    
}