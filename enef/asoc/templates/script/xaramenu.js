var ma=new Array();
var mx=new Array();
var my=new Array();
var mc=new Array();
var mal=0;
var main=0;
var menuw=200;
var psrc=0;
var pname="";
var al="";
var NS6=(!document.all&&document.getElementById);
var NS4=(!document.getElementById);
var IE5=(!NS4&&!NS6&&navigator.userAgent.indexOf('MSIE 5.0')!=-1);
if(navigator.userAgent.indexOf('Opera')!=-1)NS4=1;
function startMainMenu(file,h,w,dir,space,align){
   if(w>0)menuw=w;main=dir;
   if(main==1||main==2)document.write("<table border=\"0\" cellspacing=\""+space+"\" cellpadding=\"0\">");
   if(file!=""){
      al="";if(align==1)al=" align=\"right\"";
      if(align==2)al=" align=\"center\"";
      if(main==1||main==2)document.write("<tr><td"+al+">");
         document.write("<img src=\""+loc+file+"\" border=\"0\"");
      if(h>0)document.write(" height=\""+h+"\"");
      if(w>0)document.write(" width=\""+w+"\"");
      document.write(" />");
      if(main==1||main==2)document.write("</td>");
      if(main==1)document.write("</tr>");
      if(main==3)document.write("<br></br>");
   }
}
function endMainMenu(file,h,w){
   if(file!=""){
      if(main==1)document.write("<tr>");
      if(main==1||main==2)document.write("<td"+al+">");
      document.write("<img src=\""+loc+file+"\" border=\"0\"");
      if(h>0)document.write(" height=\""+h+"\"");
      if(w>0)document.write(" width=\""+w+"\"");
      document.write(" />");
      if(main==1||main==2)document.write("</td></tr>");
   }
   if(main==1||main==2)document.write("</table>");main=0;
}
function mainMenuItem(name,ext,h,w,url,tar,alt,dir,state,s){
   if(NS4&&main==0)return;
   var isgraphic=ext.charAt(0)==".";
   if(main==1)document.write("<tr>");
   if(main==1||main==2)document.write("<td"+al+">");
   document.write("<a ");
   if(url!=""||!isgraphic)document.write("href=\""+url+"\" ");
   if(tar!="")document.write("target=\""+tar+"\" ");
   document.write("onmouseout=\"");
   if(dir>0)document.write("tidyMenu(event);");
   document.write("\" onmouseover=\"");
   if(dir>0)document.write("openMenu(event, '"+name+"',"+dir+","+bc+","+fc+");");
   if(state>1&&isgraphic){
      document[name+"_over"]=new Image();document[name+"_over"].src=loc+name+"_over"+ext;
      document.write("setGraphic(event, '"+loc+name+"_over"+ext+"');");
   }
   document.write("return false;\"");
   if(!isgraphic)document.write(" class=\""+s+"\" style=\"width:"+(w>0?w:menuw)+"px\"");
   document.write(">");
   if(isgraphic){
      document.write("<img src=\""+loc+name+ext+"\" border=\"0\"");
      if(h>0)document.write(" height=\""+h+"\"");
      if(w>0)document.write(" width=\""+w+"\"");
      if(alt!="")document.write(" alt=\""+alt+"\"");
      document.write(" />");
   }
   else{
      document.write("&nbsp;"+ext+"&nbsp;");
   }
   document.write("</a>");
   if(main==1||main==2)document.write("</td>");
   if(main==1)document.write("</tr>");
   if(main==3)document.write("<br></br>");
}
function startSubmenu(name,style,sw){
   if(NS4)return;
   if(sw>0)menuw=sw;
   document.write("<div id=\""+name+"\" class=\""+style+"\"  style=\"width:"+(menuw+(NS6?bd*2:0))+"px\">");
}
function endSubmenu(name){
   if(NS4)return;
   document.write("</div>");
   if(!NS6)document.getElementById(name).onmouseout=tidyMenu;
}
function submenuItem(text,url,tar,s, on_click){
   if(NS4)return;
   if(text.charAt(0)=='<')document.write(text);
   else{
      document.write("<a ");
      if(url!="")document.write("href=\""+url+"\" ");
      if(on_click!="")document.write("onClick=\"" + on_click + "\" ");
      if(tar!="")document.write("target=\""+tar+"\" ");
      document.write("class=\""+s+"\" style=\"width:"+menuw+"px\">&nbsp;"+text+"&nbsp;</a>");
   }
}
function setGraphic(event,name){
   if(NS4)return;psrc=(NS6)?event.target:event.srcElement;pname=psrc.src;
   if(NS6)event.target.src=name;else event.srcElement.src=name;
}
function openMenu(event,id,pos,bc,fc){
   if(NS4)return;
   var el,x,y;
   if(mal>0){
      el=document.getElementById(ma[mal-1]);
      if(mx[mal-1]!=el.offsetLeft||my[mal-1]!=el.offsetTop){
         el.style.left=mx[mal-1];
         el.style.top=my[mal-1];
      }
      tidyMenu(event);
   }
   if(NS6){
      if(mal==0){
         x=event.target.x-bd;
         y=event.target.y;
         dx=event.target.offsetWidth;
         dy=event.target.offsetHeight;
         if(typeof(event.target.x)=="undefined"){
            x=event.target.offsetLeft;
            y=event.target.offsetTop;
         }
      }
      else{
         var p=event.target;
         if(p.nodeName!="A"&&p.parentNode.nodeName=="A")p=p.parentNode;
         dx=p.offsetWidth;
         dy=p.offsetHeight;
         el=document.getElementById(ma[mal-1]);
         x=el.offsetLeft-bd;y=el.offsetTop+p.offsetTop;
      }
   }
   else{
      x=event.clientX-event.offsetX+document.body.scrollLeft-document.body.clientLeft;
      y=event.clientY-event.offsetY+document.body.scrollTop-document.body.clientTop-bd;
      dx=event.srcElement.offsetWidth;
      dy=event.srcElement.offsetHeight;
      if(mal>0)x-=2*bd;
   }
   el=document.getElementById(id);
   if(el&&el.style.visibility!="visible"){
      if(pos==1){
         x+=dx;
         el.style.left=x-el.offsetWidth;
         el.style.top=y;
         nspeed=el.offsetWidth/frames;
      }
      else if(pos==2){
         y+=dy;
         el.style.left=x;
         el.style.top=y-el.offsetHeight;
         nspeed=el.offsetHeight/frames;
      }
      else if(pos==3){
         x-=el.offsetWidth;
         el.style.left=x+el.offsetWidth;
         el.style.top=y;
         nspeed=el.offsetWidth/frames;
      }
      mx[mal]=x;
      my[mal]=y;
      if(NS6||IE5||frames==0){
         el.style.left=x;
         el.style.top=y;
      }
      if(!IE5)clipMenu(mal,el);
      el.style.visibility="visible";
      ma[mal]=id;
      if(NS6){
         var p=event.target;
         if(p.nodeName!="A"&&p.parentNode.nodeName=="A")p=p.parentNode;
         mc[mal]=p.style;
         el.onmouseout=tidyMenu;
      }
      else{
         mc[mal]=event.srcElement.style;
         if(mal>0){
            mc[mal].backgroundColor=bc;
            mc[mal].color=fc;
         }
      }
      mal++;
   }
}
function overMenu(x,y){
   for(i=0;i<mal;i++){
      var el=document.getElementById(ma[i]);
      if(el.offsetLeft+el.offsetWidth>x&&el.offsetLeft<=x&&el.offsetTop+el.offsetHeight>y&&el.offsetTop<=y){
         return ma[i];
      }
   }
   return "";
}
function tidyMenu(e){
   if(NS4)return;
   if(NS6){
      t=overMenu(e.pageX,e.pageY);
      if(t!=""&&(e.target.firstChild==e.relatedTarget||e.target==e.relatedTarget.firstChild))return;
   }
   else t=overMenu(event.clientX+document.body.scrollLeft-document.body.clientLeft,event.clientY+document.body.scrollTop-document.body.clientTop);
   om=0;
   for(i=0;i<mal;i++){
      var mail=ma[i].length;
      if(mail>t.length||t.substring(0,mail)!=ma[i]){
         var el=document.getElementById(ma[i]);
         el.style.visibility="hidden";
         mc[i].backgroundColor="";
         mc[i].color="";
      }
      else{
         ma[om]=ma[i];
         mx[om]=mx[i];
         my[om]=my[i];
         om++;
      }
   }
   mal=om;
   if(mal==0&&psrc)psrc.src=pname;
}
function animate(){
   for(i=0;i<mal;i++){
      var el=document.getElementById(ma[i]);
      if(el.style.visibility=="visible"){
         if(el.offsetLeft<mx[i])el.style.left=Math.min(el.offsetLeft+nspeed,mx[i])+"px";
         if(el.offsetLeft>mx[i])el.style.left=Math.max(el.offsetLeft-nspeed,mx[i])+"px";
         if(el.offsetTop<my[i])el.style.top=Math.min(el.offsetTop+nspeed,my[i])+"px";
         clipMenu(i,el);
      }
   }
   if(mal!=0||frames!=0)setTimeout("animate()",50);
}
function clipMenu(i,el){
   if(el.offsetLeft>mx[i])el.style.clip="rect("+(my[i]-el.offsetTop)+"px "+(el.offsetWidth+(mx[i]-el.offsetLeft))+"px "+el.offsetHeight+"px "+0+"px)";
   else el.style.clip="rect("+(my[i]-el.offsetTop)+"px "+el.offsetWidth+"px "+el.offsetHeight+"px "+(mx[i]-el.offsetLeft)+"px)";
}
