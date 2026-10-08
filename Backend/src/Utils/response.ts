import type {ServerResponse} from "node:http";
export function sendJson(res:ServerResponse,status:number,payload:unknown){res.writeHead(status,{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,OPTIONS","Access-Control-Allow-Headers":"Content-Type"});res.end(JSON.stringify(payload));}
export function success(res:ServerResponse,data:unknown){sendJson(res,200,{success:true,data});}
export function failure(res:ServerResponse,status:number,message:string){sendJson(res,status,{success:false,message});}
