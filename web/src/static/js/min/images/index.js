Vue.use(vuelidate.default);var images=[],conditions={firstLoad:!0,words:"",order:1},vue=new Vue({el:"#data",data:{images:[]},methods:{run:function(e){var t=$(e.target).closest("li");runner.tag=app.trim(t.find(".image-tag").text());var n=$("#run-dialog");n.find(".btn").addClass("disabled"),n.find(".workspaces select").html(""),n.modal("open"),API("Workspace").getWorkspaces(function(e,t,a){if($.isEmptyObject(e)&&a&&a.body){$.map(a.body,function(e){var t=e.path;e.time=parseInt(t.substring(t.lastIndexOf("-")+1,t.length),10)}),a.body.sort(function(e,t){var a=t.time-e.time;return 0!=a?a:e.path<t.path?-1:e.path>t.path?1:0});var o="";$.map(a.body,function(e){o+='<option value="'+e.path+'">'+e.path+"</option>"});var i=n.find(".workspace-type select").val("0");0==a.body.length&&i.prop("disabled",!0),i.formSelect(),(i=n.find(".workspaces select").html(o)).formSelect(),M.FormSelect.getInstance(i[0]).destroy(),n.find(".btn").removeClass("disabled")}})},update:function(){var a=[];$.map(images,function(t){$.map(t.repoTags,function(e){(""==conditions.words||app.match([e],conditions.words))&&a.push({id:t.id,tag:e,size:t.size,created:t.created})})}),a.sort(function(e,t){switch(conditions.order){case 1:if(e.tag<t.tag)return-1;if(e.tag>t.tag)return 1;break;case 3:return t.size-e.size}var a=new Date(t.created).getTime()-new Date(e.created).getTime();return 0!=a?a:e.tag<t.tag?-1:e.tag>t.tag?1:0});var o=[];$.map(a,function(e,t){e.id?o.push({id:e.id,tag:e.tag,size:app.comma(e.size,"byte"),created:app.date.format(new Date(e.created))}):o.push({id:"img-"+t,tag:e.tag,size:"",created:"Now downloading.."})}),this.images=o,conditions.firstLoad&&(conditions.firstLoad=!1,""!=conditions.words&&0<o.length&&setTimeout(function(){$("#data .collapsible .row-body").eq(0).collapse("show"),$("#query-words").blur()},500)),$("#record-count").text(o.length)},exists:function(t){var a=!1;return $.map(images,function(e){$.map(e.repoTags,function(e){a|=e==t})}),a},del:function(e){var t=app.trim($(e.target).closest("li").find(".image-tag").text()),a=$("#image-delete");a.attr("data-image-tag",t),a.find("strong").text(t),a.modal("open")},delImage:function(i){$("#image-delete").modal("close");var e=new models.ImageName1(i);API("Image").deleteImage(e,function(e,t,a){if(app.shouldExit(a,e))return alert("Something went wrong. Check your configurations!"),void(window.location.href="/settings/");if(!$.isEmptyObject(e)){var o="Could not delete the specified image";return a&&a.body&&a.body.message&&(o=a.body.message),void M.toast({html:o,displayLength:3e3})}M.toast({html:"Deleted successfully. [ "+i+" ]",displayLength:3e3}),load()})}}}),imageformat=vuelidate.withParams({type:"custom"},function(e){if(e.length<=0)return!1;var t=/(.+\/)?([^\/:][^:]+)?(:.*)?/.exec(app.trim(e));return!(!t||t.length<4)&&void 0!==t[2]}),image=new Vue({el:"#image-dialog",data:{name:"",msgName:""},validations:{name:{custom:imageformat}},methods:{nameChanged:function(){this.msgName=""},submit:function(){setTimeout(function(){$(".btn").blur()},500),$("form p.errors").show();var e=app.trim(this.name);if(""==e||$("#image-dialog input").hasClass("invalid"))image.error("Invalid image name");else if(vue.exists(e))image.error("Already exists");else{var t=new models.ImageName(e);API("Image").postNewImage(t,function(e,t,a){if(app.shouldExit(a,e))return alert("Something went wrong. Check your configurations!"),void(window.location.href="/settings/");if(!$.isEmptyObject(e)){var o="Could not pull the specified image";return a&&a.body&&a.body.message&&(o=a.body.message),void image.error(o)}$("#image-dialog").modal("close"),load()})}},error:function(e){this.msgName=e},close:function(){$("#image-dialog").modal("close")}}}),runner=new Vue({el:"#run-dialog",data:{tag:""},methods:{submit:function(){setTimeout(function(){$(".btn").blur()},500),$("form p.errors").show(),$("#run-dialog").modal("close");var o=this.tag,e=$("#run-dialog .workspace-type select").val(),t=$("#run-dialog .workspaces select").val(),a=models.ImageName2.constructFromObject({image:o,workspace:"0"==e?"":t});API("Notebook").postNewNotebook(a,function(e,t,a){if(app.shouldExit(a,e))return alert("Something went wrong. Check your configurations!"),void(window.location.href="/settings/");location.href="/notebooks/?q="+encodeURIComponent(o)})},close:function(){$("#run-dialog").modal("close")}}});function update(){conditions.words=app.singleSpace($("#query-words").val()),conditions.order=parseInt($("#query-order-type").val(),10),vue.update()}function load(o){API("Image").getImages(function(e,t,a){$.isEmptyObject(e)&&a&&a.body&&(images=a.body,update(),o&&o())})}$(document).ready(function(){$("#menu-images").addClass("active"),app.query("q")&&$("#query-words").val(app.query("q")).focus(),load(function(){$("#act-pull").click(function(e){app.stop(e),image.name="",image.msgName="",$("#image-dialog").modal("open"),$("#image-dialog input").focus()}),$("#query-words").keyup(function(){update()}),$("#query-order-type").change(function(){update()}),$("#image-delete a.delete").click(function(){vue.delImage($("#image-delete").attr("data-image-tag"))}),$("#image-delete a.cancel").click(function(){$("#image-delete").modal("close")}),$("#run-dialog .workspace-type select").on("change",function(){var e=$("#run-dialog .workspaces select");"0"==$(this).val()?M.FormSelect.getInstance(e[0]).destroy():e.formSelect()}),$("#data").fadeIn()}),setInterval(load,1e4)});