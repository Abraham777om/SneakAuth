// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Contract{

    uint public counter = 0;

    event ContractCreated (
        bytes32 id,
        string serialNumber,
        string brand,
        string model,
        string color,
        string pairNNumber,
        string owner,
        string price,
        string location,
        uint creationDate
    );

    event Log(bytes32 message);

    struct Cont{
        bytes32 id; //crated with attributes
        string serialNumber; // not changable
        string brand; // not changable
        string model; // not changable
        string color; // not changable
        string pairNumber; //not changable
        string owner; // changable
        string price; // changable
        string location; // not changable
        uint creartionDate; // not changable
    }




    mapping (string => Cont) public conts;

    mapping(bytes32 => string) public hashToValue;

    function storeHashValue(bytes32 hash, string memory value) public {
        hashToValue[hash] = value;
    }

    function getValueHash(bytes32 hash) public view returns (string memory) {
        return hashToValue[hash];
    }

    function uint256ToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        
        uint256 tempValue = value;
        uint256 digits;
        
        while (tempValue != 0) {
            digits++;
            tempValue /= 10;
        }
        
        bytes memory buffer = new bytes(digits);
        
        while (value != 0) {
            digits = digits - 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        
        return string(buffer);
    }

    function concatenateStrings(string memory a, string memory b, string memory c, string memory d, string memory e, string memory f, 
                                string memory g) public pure returns (string memory) {
        bytes memory aa = bytes(a);
        bytes memory bb = bytes(b);
        bytes memory cc = bytes(c);
        bytes memory dd = bytes(d);
        bytes memory ee = bytes(e);
        bytes memory ff = bytes(f);
        bytes memory gg = bytes(g);

        string memory concatenatedString = new string(aa.length + bb.length + cc.length + dd.length + ee.length + ff.length + gg.length);
        bytes memory concatenatedBytes = bytes(concatenatedString);

        uint k = 0;
        for (uint i = 0; i < aa.length; i++) {
            concatenatedBytes[k] = aa[i];
            k++;
        }

        for (uint i = 0; i < bb.length; i++) {
            concatenatedBytes[k] = bb[i];
            k++;
        }
        for (uint i = 0; i < cc.length; i++) {
            concatenatedBytes[k] = cc[i];
            k++;
        }
        for (uint i = 0; i < dd.length; i++) {
            concatenatedBytes[k] = dd[i];
            k++;
        }
        for (uint i = 0; i < ee.length; i++) {
            concatenatedBytes[k] = ee[i];
            k++;
        }
        for (uint i = 0; i < ff.length; i++) {
            concatenatedBytes[k] = ff[i];
            k++;
        }
        for (uint i = 0; i < gg.length; i++) {
            concatenatedBytes[k] = gg[i];
            k++;
        }
        

        return string(concatenatedBytes);
    }

    function hashData(string memory data) public pure returns(bytes32) {
        return keccak256(abi.encodePacked(data));
    }
    
    function create(string memory _serialNumber, string memory _brand, string memory _model, string memory _color,
                    string memory _pairNumber, string memory _owner, string memory _price, string memory _location) public {
                        
                        string memory date = uint256ToString(block.timestamp);
                        string memory fid = concatenateStrings(_serialNumber, _brand, _model, _color, _pairNumber, _location, date);
                        bytes32 ID  = hashData(fid);

                        storeHashValue(ID, fid);

                        conts[fid] = Cont(ID, _serialNumber, _brand, _model, _color, _pairNumber, _owner, _price, _location, 
                                              block.timestamp);
                        emit ContractCreated(ID, _serialNumber, _brand, _model, _color, _pairNumber, _owner, _price, _location, block.timestamp);
                        counter++;
                    }
    
    function changeLocation(bytes32 _id, string memory _newLocation) public { 
        string memory val = getValueHash(_id);
        conts[val].location = _newLocation;
    }

    function changeOwner (bytes32 _id, string memory _newOwner) public {
        string memory val = getValueHash(_id);
        conts[val].owner = _newOwner;
    }
    
    function changePrice (bytes32 _id, string memory _newPrice) public {
        string memory val = getValueHash(_id);
        conts[val].price = _newPrice;
    }
}