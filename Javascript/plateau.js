class plateau{
    constructor(){
        this.currentPlayer = 1; // Who is currently playing
        this.nbMoves=0;
        this.array1 = new Array(10); // As we need a 10*10 grid we create 10 columns
        this.createGrid();// Then we created 10 lines to have the 10*10 grid
        this.placePions();
    }

    getRandomInt(min,max){
        return Math.trunc(Math.random() * (max - min) + min);
    }

    createGrid(){ // We create a grid of 10*10
        for (let i = 0; i < 10; ++i)
        {
            this.array1[i] = new Array(10);
        }
    }

    placePions(){
        let tabJ1=[[],[],[],[]]; // Tableau joueur 1 (on attend le socket du serveur hein)
        let tabJ2=[[],[],[],[]]; // Tableau joueur 2 (on attend le socket du serveur hein)
        for(let x = 0; x < 4; x++)
        {
            for(let y = 0; y < 10; y++)
            {
                tabJ1[x][y] = new Pions(2, 1, "maréchal", 10, 0, 1, 1, 0);
                tabJ2[x][y] = new Pions(12, 6, "bombe", 11, 1, 1, 1, 1);
            }
        }
        // First Player's pawns
        for(let x = 0; x < 4; x++)
        {
            for(let y = 0; y < 10; y++)
            {
                this.array1[x][y] = tabJ1[x][y];
            }
        }
        // Middle
        for(let x = 4; x < 6; x++)
        {
            for(let y = 0; y < 10; y++)
            {
                this.array1[x][y] = new Pions(0, -1, "Satan", -1, -1, -1, -1, -1);
            }
        }
        // Second Player's pawns
        for(let x = 6; x < 10; x++)
        {
            for(let y = 0; y < 10; y++)
            {
                this.array1[x][y] = tabJ2[x-6][y];
            }
        }
        let plateau=document.getElementById("plateau");
        let tr, td;
        if(this.currentPlayer==0){
            for(let i = 0; i < 10;i++){
                for (let j = 0; j < 10;j++)
                {
                    console.log("Player:",this.array1[i][j].Player);
                    if((i==4 || i ==5) && (j == 2 || j == 3 || j == 6 || j == 7)) {
                        td = tr.appendChild(document.createElement('td'));
                        td.className="eau";
                        td.value="0";
                    }
                    else{
                        if(this.array1[i][j].Id == 0)
                        {
                            if(j==0) 
                            {
                                plateau=document.getElementById("plateau");
                                tr = plateau.appendChild(document.createElement('tr'));
                                td = tr.appendChild(document.createElement('td'));
                                td.className="terre";
                                td.value="1";
                            }
                            else
                            {
                                td = tr.appendChild(document.createElement('td'));
                                td.className="terre";
                                td.value="1";
                            }
                        }
                        else
                        {
                            for(let z=1;z<13;z++){
                                if(j==0) {
                                    if(this.array1[i][j].Id == z){
                                        plateau=document.getElementById("plateau");
                                        tr = plateau.appendChild(document.createElement('tr'));
                                        td = tr.appendChild(document.createElement('td'));
                                        if(this.array1[i][j].Player==0) td.className="terre"+z;
                                        else td.className="terre";
                                        td.value="1";
                                    }
                                }
                                else{
                                    if(this.array1[i][j].Id == z){
                                        td = tr.appendChild(document.createElement('td'));
                                        if(this.array1[i][j].Player==0) td.className="terre"+z;
                                        else td.className="terre";
                                        td.value="1";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else if(this.currentPlayer==1){
            for(let i = 0; i < 10;i++){
                for (let j = 0; j < 10;j++)
                {
                    if((i==4 || i ==5) && (j == 2 || j == 3 || j == 6 || j == 7)) {
                        td = tr.appendChild(document.createElement('td'));
                        td.className="eau";
                        td.value="0";
                    }
                    else{
                        if(this.array1[i][j].Id == 0)
                        {
                            if(j==0) 
                            {
                                plateau=document.getElementById("plateau");
                                tr = plateau.appendChild(document.createElement('tr'));
                                td = tr.appendChild(document.createElement('td'));
                                td.className="terre";
                                td.value="1";
                            }
                            else
                            {
                                td = tr.appendChild(document.createElement('td'));
                                td.className="terre";
                                td.value="1";
                            }
                        }
                        else
                        {
                            for(let z=1;z<13;z++){
                                if(j==0) {
                                    console.log("nouvelle ligne");
                                    if(this.array1[i][j].Id == z){
                                        plateau=document.getElementById("plateau");
                                        tr = plateau.appendChild(document.createElement('tr'));
                                        td = tr.appendChild(document.createElement('td'));
                                        if(this.array1[i][j].Player==1) td.className="terre"+z;
                                        else td.className="terre";
                                        td.value="1";
                                    }
                                }
                                else{
                                    console.log("pas nouvelle ligne");
                                    if(this.array1[i][j].Id == z){
                                        td = tr.appendChild(document.createElement('td'));
                                        if(this.array1[i][j].Player==1) td.className="terre"+z;
                                        else td.className="terre";
                                        td.value="1";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    getCaseState(x,y){ // Check if it's 'water' or 'terre'
        let grille = document.getElementById("plateau");
        if( grille.rows[x].cells[y].className != "eau")
        {
            return true;
        }
        return false;
    }

    getCurrentPlayer(){ // As we have only 2 players, by knowing who played first we know who is playing next
        return (this.nbMoves % 2);
    }


}