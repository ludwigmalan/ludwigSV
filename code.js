let projects=document.getElementById('main')
let files=['calculator','grapher','gravity simulator','mandelbrot','memory_game','particles','pezu_tower','sound_vissualizer','multigon_render','toInfiniteDecimalPlaces','spiderman']
for(let i=0;i<files.length;i++){
    if(files[i]!='node_modules'){
    projects.innerHTML=projects.innerHTML+`<a class="project" href="${files[i]}/index.html">${files[i]}</a>`
    }
}