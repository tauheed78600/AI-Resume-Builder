import AzureWaveResume from "./AzureWaveResume";
import SapphireBreezeResume from "./SapphireBreezeResume";
import AmberGlowResume from "./AmberGlowResume";
import CoralReefResume from "./CoralReefResume";
import IvorySkylineResume from "./IvorySkyline";
import FreshSingle from "./FreshSingle";

const resumeTemplates = [
  {
    id: 'azure_wave',
    component: <AzureWaveResume />,
    name: "Azure Wave"
  },
  {
    id: 'sapphire_breeze',
    component: <SapphireBreezeResume />,
    name: "Sapphie Breeze"
  },
  {
    id: 'amber_glow',
    component: <AmberGlowResume />
    ,name:"Amber Glow"
  },
  {
    id: 'coral_reef',
    component: <CoralReefResume />,
    name: "Coral Reef"
  },
  {
    id: 'ivory_skyline',
    component: <IvorySkylineResume />,
    name: "Ivory Skyline"
  },
  {
    id: 'fresh_single',
    component: <FreshSingle/>,
    name: "Fresh Single"
  },
];

export default resumeTemplates;
