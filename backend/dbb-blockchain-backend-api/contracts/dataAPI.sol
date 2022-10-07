// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract dataAPI {
    //Defining structure 
    struct userData {
        string cid;
        string fileName;
    }
    mapping (string => userData[]) userMap;    
    string[] private arr;
    function addCID(string memory user,string memory cid1,string memory fileName) public {


        userData memory u = userData({cid:cid1,fileName:fileName});
        userMap[user].push(u);

        // u.cid=cid1;
        // u.fileName=fileName;
        // userMap[user].push(u);
    }
    function get(string memory user) public view returns (userData [] memory){
        return userMap[user];
    } 
}