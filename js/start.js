/* =====================================================================
   AXIOM — start-up: every script has loaded, so draw the page once.
   (Before 2.4 the page was redrawn ~16 times while the app loaded.)
   ===================================================================== */
/* the question-bank size is shown on Today; building the bank takes ~0.3 s, so remember the count per version */
(function(){var K="axiom_qbn_"+(typeof AXV!=="undefined"?AXV:"");if(typeof QB_TOTAL!=="function")return;var _t=QB_TOTAL;
  QB_TOTAL=function(){if(!QB){try{var v=+localStorage.getItem(K);if(v>0)return v}catch(e){}}var n=_t();try{localStorage.setItem(K,n)}catch(e){}return n}})();
BOOT=0;
try{router()}catch(e){console.error(e)}
