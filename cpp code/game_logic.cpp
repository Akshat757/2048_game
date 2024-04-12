#include <iostream> 
#include <vector>
using namespace std;

void printarr(vector<vector<int>> arr){
    int n = arr.size();
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            cout<<arr[i][j]<<"  ";
        }
        cout<<endl;
    }
}

//[0,1,2,3,4,5,6,7,8,9,10]

int rNum(){
    int y = rand() % 2;
    if(y==1) return 4;
    if(y==0) return 2;
}

int generateRandomNum(int x){
    return rand() % x;
}

pair<int,int> randomPos(vector<vector<int>> arr){
    vector<pair<int,int>> emptyPos;
    int n=arr.size();
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            pair<int,int> temp(i,j);
            if(arr[i][j]==0) emptyPos.push_back(temp);
        }
    }
    if(emptyPos.size()==0) return {-1,-1};
    int randNum = generateRandomNum(emptyPos.size());
    return emptyPos[randNum];

}

void top(vector<vector<int>> &arr){
    int n=arr.size();
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            if(arr[i][j] != 0){
                for(int k=0;k<i;k++){
                    if(arr[k][j]==0) swap(arr[i][j],arr[k][j]);
                    if(arr[k][j]==arr[i][j]){
                        arr[k][j]*=2;
                        arr[i][j]=0;
                    } 
                }
            }
        }
    }
    pair<int,int> pos = randomPos(arr);
    arr[pos.first][pos.second] = rNum();
    printarr(arr);
}

void down(vector<vector<int>> &arr){
    int n=arr.size();
    for(int i=n-1;i>=0;i--){
        for(int j=0;j<n;j++){
            if(arr[i][j] != 0){
                for(int k=n-1;k>i;k--){
                    if(arr[k][j]==0) swap(arr[i][j],arr[k][j]);
                    else if(arr[k][j]==arr[i][j]){
                        arr[i][j]=0;
                        arr[k][j]*=2;
                    } 
                }
            }
        }
    }
    pair<int,int> pos = randomPos(arr);
    arr[pos.first][pos.second] = rNum();
    printarr(arr);
}

void left(vector<vector<int>> &arr){
    int n=arr.size();
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            if(arr[j][i] != 0){
                for(int k=0;k<i;k++){
                    if(arr[j][k]==0) swap(arr[j][i],arr[j][k]);
                    if(arr[j][i]==arr[j][k]){
                        arr[j][k]*=2;
                        arr[j][i]=0;
                    } 
                }
            }
        }
    }
    pair<int,int> pos = randomPos(arr);
    arr[pos.first][pos.second] = rNum();
    printarr(arr);
}

void right(vector<vector<int>> &arr){
    int n=arr.size();
    for(int i=n-1;i>=0;i--){
        for(int j=0;j<n;j++){
            if(arr[j][i] != 0){
                for(int k=n-1;k>i;k--){
                    if(arr[j][k]==0) swap(arr[j][i],arr[j][k]);
                    if(arr[j][k]==arr[j][i]){
                        arr[j][k]*=2;
                        arr[j][i]=0;
                    }
                }
            }
        }
    }
    pair<int,int> pos = randomPos(arr);
    arr[pos.first][pos.second] = rNum();
    printarr(arr);
}



void game(int gridSize){
    vector<vector<int>> arr(gridSize, (vector<int>(gridSize,0)));
    pair<int,int> pos = randomPos(arr);
    arr[pos.first][pos.second] = rNum();
    pos = randomPos(arr);
    arr[pos.first][pos.second] = rNum();
    
    printarr(arr);

    while(true){
        pair<int,int> check = randomPos(arr);
        if(check.first == -1){
           cout<<"GAME OVER"<<endl;
           break; 
        }
        cout<<"enter input(w a s d): "<<endl;
        char inp;
        cin>>inp;

        switch(inp){
            case 'w':
                top(arr);
                break;
            case 's':
                down(arr);
                break;
            case 'a':
                left(arr);
                break;
            case 'd':
                right(arr);
                break;
            default:
                cout<<"invalid command";
        }

        // if(inp=='w') top(arr);
        // else if(inp=='s') down(arr);
        // else if(inp=='a') left(arr);
        // else if(inp=='d') right(arr);
        // else cout<<"Invalid input, re-enter your input"<<endl;
    }

}

int main(){
    while(true){
        int q = 1;
        cout<<"Press 1 for New Game"<<endl<<"Press 0 to end game"<<endl;;
        cin>>q;
        if(q){
            int gridSize;
            cout<<"enter the size of the grid you want to play betwn (3-16): ";
            cin>>gridSize;
            game(gridSize);
        }
        else break;
    }
    
    return 0;
}