наложить черную сетку
поверх нее наложить блюр


сделать чтобы строка "бежала"
на экране помещается, часть текста. затем она сдвигается влево, в цикле. когда пространство свободное начало текста должно опять идти справа. если бы это были просто ячейки алгоритм бы был такой

let text
let screen[capacity_of_screen_in_cells]
let buffer = text


const timeToSleep = 1000;

let running = true;
while(running){
    let bufferLength = buffer.length
    let firstLetter = buffer[0]

    for(let i = 0; i < bufferLength-1; i++){
        buffer[i] = buffer[i+1]
    }
    buffer[bufferLength-1] = firstLetter
    await new Promise(r => setTimeout(r, timeToSleep));

    screen = buffer.slice(0,screen.length)
}

timer.sleep(1000)
