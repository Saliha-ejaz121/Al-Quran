 module.exports = (template , data , num)=>{
let output = template.replace(/{%SurahName%}/g , data.name);
output = output.replace(/{%SurahEnglishName%}/g , data.englishName);
output = output.replace(/ {%revelationType%}/g , data.revelationType);
output = output.replace(/{%ID%}/g, data.number - 1);
 output = output.replace(/{%ayah%}/g, data.text);
 output = output.replace(/{%num%}/g, data.number);
   
return output;
}