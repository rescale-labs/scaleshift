var apiToken="",vue=new Vue({el:"#form-job-result",data:{task:{statusMore:"",imageHref:"",commands:"",platform:"",link:"",mounts:"",started:"",ended:""}},methods:{update:function(e){var a=0<e.mounts.length?e.mounts[0]:"";0<a.length&&(a='<a href="/workspaces/?q='+encodeURIComponent(a)+'">'+a+"</a>"),this.task={statusMore:statusValue(e.status),imageHref:'<a href="/images/?q='+encodeURIComponent(e.image)+'">'+e.image+"</a>",commands:e.commands.join(" "),platform:e.platform,link:e.external_link?e.external_link:"",mounts:a,started:app.date.format(new Date(e.started)),ended:app.date.format(new Date(e.ended))}}}}),logs=new Vue({el:"#logs",data:{logs:[]},methods:{update:function(e){var t=[];$.map(e,function(e,a){t.push({seq:a,log:e.log,time:app.date.format(new Date(e.time))})}),0<(this.logs=t).length&&$("#logs").fadeIn()}}}),files=new Vue({el:"#files",data:{files:[]},methods:{update:function(e){var t=[];$.map(e,function(e,a){t.push({seq:a,name:e.name,size:app.comma(e.size,"byte"),url:e.downloadURL})}),0<(this.files=t).length&&$("#files").fadeIn()},download:function(e){var a=new XMLHttpRequest;a.open("GET",$(e.target).closest("tr").attr("data-url")),a.addEventListener("load",function(){var e=function(e){for(var a,t=[],n=e.length,s=0;s<n;s++)a=(255&e.charCodeAt(s))>>>0,t.push(String.fromCharCode(a));return t.join("")}(this.responseText);e="data:application/pdf;base64,"+btoa(e),document.location=e},!1),a.setRequestHeader("Authorization","Token "+apiToken),a.overrideMimeType("application/octet-stream; charset=x-user-defined;"),a.send(null)}}});function statusValue(e){switch(e){case"building":return"preparing";case"pushing":case"k8s-job-init":case"rescale-send":return"sending";case"k8s-job-started":case"k8s-job-pending":case"k8s-job-runnning":case"rescale-start":case"rescale-runnning":return"running";case"k8s-job-succeeded":case"k8s-job-failed":case"rescale-succeeded":case"rescale-failed":return"done"}return"unknown"}$(document).ready(function(){$("#menu-tasks").addClass("active"),app.query("id")?API("Job").getJobDetail(app.query("id"),function(e,a,t){$.isEmptyObject(e)&&t&&t.body&&(vue.update(t.body),logs.update(t.body.logs),files.update(t.body.files),apiToken=t.body.apiToken,$("#form-job-result>table").fadeIn(),$(".wait-icon").hide())}):window.location.href="/tasks/"});