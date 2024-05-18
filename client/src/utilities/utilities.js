let displayText = "";
// Define our labelmap
const labelMap = {
    1:{name:'agree', color:'red'},
    2:{name:'hello', color:'yellow'},
    3:{name:'peace', color:'green'},
    4:{name:'rock', color:'blue'},
}

export const setdisplayText = (text) => {
    displayText = text;
}

export const getdisplayText = () => {
    return displayText;
};

// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
    for(let i=0; i<boxes.length; i++){
        // console.log(boxes[i]);
        // console.log(classes[i]);
        //console.log(scores[i]);
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            const [y,x,height,width] = boxes[i]
            const text = classes[i]
            
            // Check if the class index is valid
            if (labelMap[text]) {
                // Set styling
                ctx.strokeStyle = labelMap[text]['color']
                ctx.lineWidth = 10
                ctx.fillStyle = 'white'
                ctx.font = '30px Arial'

                displayText = labelMap[text]['name']
                
                // DRAW!!
                ctx.beginPath()
                ctx.fillText(displayText + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
                ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
                ctx.stroke()
            } else {
                console.log(`Invalid class index: ${text}`);
            }
        }
    }
}

export { displayText };
