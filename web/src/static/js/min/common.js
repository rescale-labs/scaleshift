window.app={stop:function(e){return!!(e=e||window.event)&&(e.cancelBubble=!0,e.stopPropagation&&e.stopPropagation(),e.returnValue=!1,e.preventDefault&&e.preventDefault(),e)},shouldExit:function(e,t){return!$.isEmptyObject(t)||!(!e||!e.body||500!=e.body.code||"invalid token"!=e.body.message)},trim:function(e){return e?app.singleSpace(e).replace(/\s/g,""):""},singleSpace:function(e){return e.replace(/　/g," ").replace(/\s+/g," ")},match:function(r,e){var a=!0;null==r&&(r="");var t=app.singleSpace(e).split(" ");return $.isArray(r)?$.map(t,function(t){if(""!=t){var n=!1;$.map(r,function(e){n|=-1<(e+"").indexOf(t)}),a&=n}}):$.map(t,function(e){""!=e&&(a&=-1<(r+"").indexOf(e))}),a},comma:function(e,t){return void 0===e?"":"yen"==t?e.toString().replace(/(\d)(?=(\d{3})+$)/g,"$1,")+"円":"byte"==t?1073741824<=e?(e/1073741824).toFixed(2)+" GB":1048576<=e?(e/1048576).toFixed(2)+" MB":1024<=e?(e/1024).toFixed(2)+" KB":1<e?e+" bytes":1==e?e+" byte":"0 byte":e.toString().replace(/(\d)(?=(\d{3})+$)/g,"$1,")},query:function(e,t){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]"),t=t||"";var n=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(location.search);return null===n?t:decodeURIComponent(n[1].replace(/\+/g," "))},date:{format:function(e,t){if("en"==t){return["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][e.getDay()]+", "+n(e.getDate())+" "+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.getMonth()]+" "+n(e.getYear()+1900)+" "+n(e.getHours())+":"+n(e.getMinutes())+":"+n(e.getSeconds())}return n(e.getYear()+1900)+"/"+n(e.getMonth()+1)+"/"+n(e.getDate())+" "+n(e.getHours())+":"+n(e.getMinutes())+":"+n(e.getSeconds());function n(e){return e<10?"0"+e:e}},fromto:function(e,t,n,r){var a,o;if("en"==r){if((a=i(e,n))==(o=t?i(t,n):""))o="";else{if(n)return o=o.replace(a.substring(0,6),""),a+" ~ "+o;o=o.replace(a.substring(0,16),"")}return""==o?a+" ~ ":a+" ~ "+o}if((a=s(e,n))==(o=t?s(t,n):""))o="";else{if(n)return o=o.replace(a.substring(0,6),""),a+" ~ "+o;o=o.replace(a.substring(0,11),"")}return""==o?a+" ~ ":a+" ~ "+o;function i(e,t){return e=app.date.format(new Date(e),"en"),t?e.substring(5,11)+e.substring(16,22):e.substring(0,22)}function s(e,t){return e=app.date.format(new Date(e)),t?e.substring(5,16):e.substring(0,16)}},lastMidnight:function(){return new Date((new Date).setHours(0,0,0,0))}},textarea:function(e){var t,n;e.id&&(t=document.getElementById(e.id)),e.textarea&&(t=e.textarea),t&&(e.min=e.min?e.min:30,n=parseInt(t.style.height,10),t.style.height=(n<e.min?e.min:n)+"px",n=parseInt(t.scrollHeight,10),e.max&&e.max<n&&(n=e.max),t.style.height=n+"px")},ui:{datetime:function(t){return $("#"+t.id).attr("data-value",app.date.format(t.date)).pickadate({monthsFull:["1 月","2 月","3 月","4 月","5 月","6 月","7 月","8 月","9 月","10 月","11 月","12 月"],weekdaysShort:["日","月","火","水","木","金","土"],weekdaysLetter:["日","月","火","水","木","金","土"],format:"yyyy年m月d日(ddd)",formatSubmit:"yyyy-mm-dd",selectMonths:!0,selectYears:3,max:void 0!==t.max&&t.max,min:void 0!==t.min&&t.min,onOpen:function(){app.ui.relocate({triggerId:"#"+t.id,followerId:"#"+t.id+"_root .picker__frame"}),$("#"+t.id+"_root").animate({opacity:1})},onSet:function(e){e&&e.select&&(t.onSet&&t.onSet(e.select),this.close())},onClose:function(){$(document.activeElement).blur(),$("#"+t.id+"_root").css({opacity:0}),t.onClose&&t.onClose()}}).pickadate("picker")},relocate:function(e){var t=$(e.triggerId),n=$(e.followerId),r=t.offset().top+t.height()+4-$(window).scrollTop();e.right?n.css({top:r+"px",left:t.offset().left+t.width()-1+parseInt(t.css("paddingLeft"),10)-n.width()+"px"}):n.css({top:r+"px",left:t.offset().left+2+"px"})}},storage:{get:function(e){var t=localStorage.getItem(e);return t?JSON.parse(t):null},set:function(e,t){var n=JSON.stringify(t);localStorage.setItem(e,n)},remove:function(e){localStorage.removeItem(e)}},refreshMenus:function(e){e.useNGC||e.usePrivateRegistry?$("#menu-repositories").fadeIn():$("#menu-repositories").hide(),e.useNGC?$("#menu-ngc-repo").fadeIn():$("#menu-ngc-repo").hide(),e.usePrivateRegistry?$("#menu-prv-repo").fadeIn():$("#menu-prv-repo").hide(),e.useRescale||e.useKubernetes?$("#menu-tasks").fadeIn():$("#menu-tasks").hide()}},$("#signout").click(function(e){app.stop(e),auth.exit()}),$(document).ready(function(){var e=auth.session(),t=config.get();app.refreshMenus(t),null!=e.username&&"---"!=e.username&&($(".user-name").text(e.username),$("#signout").parent().show()),$("select").formSelect();var n=$(".modal").detach();$("body").append(n),n.modal()});