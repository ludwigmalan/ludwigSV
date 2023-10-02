let projects=document.getElementById('main')
let files=['grapher','gravity simulator','mandelbrot','memory_game','particles','pezu_tower','sound_vissualizer','multigon_render','toInfiniteDecimalPlaces','spiderman']
for(let i=0;i<files.length;i++){
    if(files[i]!='node_modules'){
    projects.innerHTML=projects.innerHTML+`<div class="project-div"><a class="project" href="${files[i]}/index.html">${files[i]}</a><a class="instructions" href="info/${files[i]}.html">info</a></div>`
    }
}