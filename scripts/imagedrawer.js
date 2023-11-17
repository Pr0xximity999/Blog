import { readdirSync } from "fs"; 
                
let filenames = readdirSync('imageDrawer/'); 
    
console.log("\nFilenames in directory:"); 
filenames.forEach((file) => { 
    console.log("File:", file); 
}); 