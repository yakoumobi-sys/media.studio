import {NextRequest,NextResponse} from 'next/server';
export const runtime='nodejs';
export async function POST(req:NextRequest){
 try{
  const origin=req.headers.get('origin');if(origin&&new URL(origin).host!==req.headers.get('host'))return NextResponse.json({error:'Origine non autorisée'},{status:403});
  const body=await req.json();if(body.website)return NextResponse.json({ok:true});
  const str=(k:string,max:number)=>typeof body[k]==='string'?body[k].trim().slice(0,max):'';
  const lead={name:str('name',100),company:str('company',120),email:str('email',254),phone:str('phone',40),service:str('service',80),budget:str('budget',80),message:str('message',3000),source:'website'};
  if(lead.name.length<2||!lead.company||!/^\S+@\S+\.\S+$/.test(lead.email)||lead.message.length<5||!lead.service)return NextResponse.json({error:'Merci de compléter les champs obligatoires.'},{status:400});
  const url=process.env.MEDIA_SUPABASE_URL,key=process.env.MEDIA_SUPABASE_PUBLISHABLE_KEY;
  if(!url||!key)return NextResponse.json({error:'Service momentanément indisponible.'},{status:503});
  const r=await fetch(url+'/rest/v1/media_leads',{method:'POST',headers:{'Content-Type':'application/json','apikey':key,'Prefer':'return=minimal'},body:JSON.stringify(lead),cache:'no-store'});
  if(!r.ok){console.error('Lead insert failed',r.status);return NextResponse.json({error:'Envoi impossible. Réessayez.'},{status:502});}
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:'Requête invalide'},{status:400})}
}
