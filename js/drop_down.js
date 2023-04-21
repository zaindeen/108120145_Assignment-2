function create_drop_W(vertical,seasonNumber,show){
    //when season is selected the dropdown is hidden
    if(seasonNumber === 0){
        const hide = document.querySelector('.show_'+prev[show][0]+'_season_'+prev[show][1]);
        hide.classList.add('hidden');
    }

    // if the dropdown is already created just the hidden is removed 
    const ifExist = document.querySelector('.show_'+show+'_season_'+seasonNumber);
    if(ifExist !== null){
        ifExist.classList.remove('hidden');
        return;
    }

    // for season number and check box
    const seasContainer = document.createElement('div');
    const seas = document.createElement('h2');
    const marcar = document.createElement('label');
    const check_box = document.createElement("input");
    const eyeImageLabel = document.createElement('label');
    const eyeImage = document.createElement('img');
    
    //class 
    seasContainer.classList.add('show_'+show+'_season_'+seasonNumber);
    seas.classList.add('season_heading');
    check_box.classList.add('cbox');
    check_box.id = 'show_'+show+'_sea_'+seasonNumber;
    eyeImage.id = 'show_'+show+'_sea_'+seasonNumber;
    eyeImage.classList.add('eye');

    check_box.style.margin = "0px 10px 0px 0px";
    marcar.classList.add('Marcar_Todos');

    eyeImageLabel.setAttribute('for',check_box.id);
    eyeImageLabel.id = 'label_'+check_box.id;
    eyeImage.setAttribute('src','images/eye-gray.png')
    seas.textContent = 'Season '+seasonNumber;
    check_box.type = "checkbox";
    marcar.innerHTML = 'Select All';

    vertical.appendChild(seasContainer);
    seasContainer.appendChild(seas);
    seasContainer.appendChild(check_box);
    seasContainer.appendChild(eyeImageLabel);
    eyeImageLabel.appendChild(eyeImage);
    seasContainer.appendChild(marcar);

    // for the episodes and its detail
    for(let i=0;i<TV_SHOWS[show].seasons[seasonNumber-1].length;i++){
        const episode = document.createElement('div');
        const imgContainer = document.createElement('div');
        const img  = document.createElement('img');
        const descDiv = document.createElement('div');
        const descCheck = document.createElement('input'); 
        descCheck.type = 'checkbox';
        const descTitle = document.createElement('h3');
        const descDate = document.createElement('span');
        const descSumm = document.createElement('p');

        // adding class 
        descCheck.style.margin = "20px 10px auto 0px";
        episode.classList.add('episode_box');
        episode.classList.add('epsiode_box_'+show+'_'+seasonNumber);
        episode.id = 'episode_box_' + seasonNumber + '_' + i; 
        imgContainer.classList.add('episode_images');
        img.classList.add('episode_images_');
        descDiv.classList.add('description');
        descCheck.classList.add('check_box_'+show+'_'+seasonNumber);
        descCheck.classList.add('hidden');
        descCheck.id = 'check_box_' + seasonNumber + "_" + i;
        descTitle.classList.add('episode_title');
        descDate.classList.add('airing_date');
        descSumm.classList.add('episode_summary');
        episode.draggable = 'false';

        //adding img src and desc from json
        if(i>8)
            descTitle.textContent = 'S0' + seasonNumber + 'E' + parseInt(i+1) +': '+ TV_SHOWS[show].seasons[seasonNumber-1][i].name;
        else
            descTitle.textContent = 'S0' + seasonNumber + 'E0' + parseInt(i+1) +': '+TV_SHOWS[show].seasons[seasonNumber-1][i].name;
        img.src = TV_SHOWS[show].seasons[seasonNumber-1][i].image;
        var [year,month,date] = TV_SHOWS[show].seasons[seasonNumber-1][i].airdate.split("-");
        descDate.textContent = date + "/" + month + "/" + year ;
        descSumm.textContent = TV_SHOWS[show].seasons[seasonNumber-1][i].summary;

        seasContainer.appendChild(episode);
        episode.setAttribute('data-watched','false');
        episode.appendChild(imgContainer);
        imgContainer.appendChild(img);
        episode.appendChild(descCheck);
        episode.appendChild(descDiv);
        descDiv.appendChild(descTitle);
        descDiv.appendChild(descDate);
        descDiv.appendChild(descSumm);
    }
    // event Listeners to all the check boxes as soon as they are created for time cal
    check_Box = document.querySelectorAll('.cbox');
    check_Box.forEach(
        checkBoxAll =>{
        checkBoxAll.addEventListener('change',checkAll);
        }
    );
    check_Box_epi = document.querySelectorAll('.episode_box');
    check_Box_epi.forEach(
        checkBoxAllEpi =>{
        checkBoxAllEpi.addEventListener('click',toggle);
        checkBoxAllEpi.addEventListener('click',green);
        checkBoxAllEpi.addEventListener('click',calTime);
        }
    );
}

function onWClick(event){
    const season = event.currentTarget;
    const val = parseInt(season.id);
    const vertical = document.querySelectorAll('.vertical');
    const number = parseInt(season.value.split(" ")[1]);

    if(number!==0 & click[val]===0){
        create_drop_W(vertical[val],number,val);
        click[val] = 1;
    }
    else if(number!== 0 & click[val]!==0){
        if(prev[val][1]!==0){
        const hide = document.querySelector('.show_'+prev[val][0]+'_season_'+prev[val][1]); 
        hide.classList.add('hidden');
        }   
        create_drop_W(vertical[val],number,val);
    }
    else{
        if(prev[val][1]!==0){
        const hide = document.querySelector('.show_'+prev[val][0]+'_season_'+prev[val][1]); 
        hide.classList.add('hidden');
        }
    }
    // to know the current element in each show's dropdown so it can be hide at next dropdown
    prev[val][0] = val;
    prev[val][1] = number;
}