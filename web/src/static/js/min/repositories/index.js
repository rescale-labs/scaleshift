var converter=new showdown.Converter,images=[],conditions={firstLoad:!0,words:""},vue=new Vue({el:"#data",data:{images:[]},methods:{update:function(){var o=[];$.map(images,function(e){(""==conditions.words||app.match([e.namespace,e.name],conditions.words))&&o.push({code:e.namespace+"/"+e.name,namespace:e.namespace,name:e.name,description:e.description?converter.makeHtml(e.description):"---"})}),o.sort(function(e,o){return e.name<o.name?-1:e.name>o.name?1:0}),this.images=o,conditions.firstLoad&&(conditions.firstLoad=!1,""!=conditions.words&&0<o.length&&setTimeout(function(){$("#query-words").blur()},750)),$("#record-count").text(o.length),$(".wait-icon").hide()}}});function update(){conditions.words=app.singleSpace($("#query-words").val()),vue.update()}function load(n){API("Repository").getRemoteRepositories(function(e,o,t){if(app.shouldExit(t,e))return alert("Something went wrong. Check your configurations!"),void(window.location.href="/settings/");images=t.body,update(),n&&n()})}function loadDetails(a){if(!$(a).attr("data-loaded")){var i=$(a).attr("data-ns");i&&(i+="/");var r=$(a).attr("data-nm");API("Repository").getRemoteImages(r,function(e,o,t){if(app.shouldExit(t,e))return alert("Something went wrong. Check your configurations!"),void(window.location.href="/settings/");t.body.sort(function(e,o){return e.repoTags[0]<o.repoTags[0]?1:e.repoTags[0]>o.repoTags[0]?-1:0});var n="";$.map(t.body,function(e){var o=e.repoTags[0];n+='<tr data-id="'+i+r+":"+o+'">',n+="<td>"+o+"</td>",n+='<td><a class="waves-effect waves-light btn blue darken-1">download</a></td>',n+="</tr>"}),$(a).find(".progress").hide(),$(".row-body tbody",a).html(n),$(".row-body .btn",a).click(function(e){pullImage($(e.target).closest("tr").attr("data-id"))}),$(a).attr("data-loaded","done")})}}function pullImage(n){var e=new models.ImageName(n);API("Image").postNewImage(e,function(e,o,t){if(app.shouldExit(t,e))return alert("Something went wrong. Check your configurations!"),void(window.location.href="/settings/");location.href="/images/?q="+encodeURIComponent(n)})}$(document).ready(function(){config.get().usePrivateRegistry?($("#menu-repositories, #menu-prv-repo").addClass("active"),app.query("q")&&$("#query-words").val(app.query("q")).focus(),$(".collapsible").on("shown.bs.collapse",function(e){loadDetails($(e.target).closest("li"))}),load(function(){$("#query-words").keyup(function(){update()}),$("#data").fadeIn()})):window.location.href="/images/"});