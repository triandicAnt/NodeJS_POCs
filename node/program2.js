var sum = 0
// console.log(process.argv);
for (i=2; i< process.argv.length;i++){
    // console.log(i);
    sum+=parseInt(process.argv[i]);
} 
console.log(sum);