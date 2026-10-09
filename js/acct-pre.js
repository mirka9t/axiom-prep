/* Zero to 800 — local accounts: maps the progress key to the signed-in user (runs first) */
(function(){var SES="z800_session",u=null,users={};
  try{users=JSON.parse(localStorage.getItem("z800_users")||"{}");u=sessionStorage.getItem(SES)||localStorage.getItem(SES)}catch(e){}
  if(u&&u!=="__guest"&&!users[u])u=null;
  window.Z800_USER=u;
  var P=Storage.prototype,gi=P.getItem,si=P.setItem,ri=P.removeItem;
  function map(k){return (k==="z800"&&window.Z800_USER&&window.Z800_USER!=="__guest")?"z800_u_"+window.Z800_USER:k}
  P.getItem=function(k){return gi.call(this,map(k))};P.setItem=function(k,v){return si.call(this,map(k),v)};P.removeItem=function(k){return ri.call(this,map(k))};
})();
