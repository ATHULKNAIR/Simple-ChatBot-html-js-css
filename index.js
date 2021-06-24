document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input")
    inputField.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            let input = inputField.value;
            inputField.value = "";
            output(input);
        }
    })

})


const prompts = [
    ["hi", "hello", "buddy", "whats up","bro"],
    ["good morning", "morning"],
    ["good aftrenoon", "afternoon"],
    ["good evening", "evening"],
    ["good night", "night"],
    ["going to have food","going to have lunch","going to have dinner"],
    ["going to attend the meeting", "going for interview"],
    ["time", "what is the time now", "current time", "time right now"],
    ["date","today","todays date","what is todays date"],
    ["day","today","which day is today"],
    ["who is your master"],
    ["what is your name","who are you"],
    ["bye","i am going","its time to go"]


]

// Possible responses, in corresponding order
var time = new Date().toLocaleTimeString();
var date = new Date().toLocaleDateString();
var weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
var day = weekday[new Date().getDay()-1]

const replies = [
    ["Hey..!", "Hello..!", "what's Up..!","Bro..!","Dude..!","How can I help you ?"],
    ['Morning..!', "Very good Morning..!","Good Morning !, Had your Breakfast?"],
    ["Good Afternoon to you..!", "Good Afternoon. How is your day?","Had your Lunch?"],
    ["Good Evening to you..!", "Good Evening. How was your day?", "Good Evening..! How can i help you?"],
    ["Good Night..!", "Good Night. Have a Sweet Dream"],
    ["All the best Master..!"],
    [time],
    [date],
    [day],
    ["Athul K Nair", "I dont like to disclose my master", "He is an awesome Guy..!"],
    ["I am Buddy, your bot","Me.I am your Buddy Dude..!"],
    ["Bye-Bye","Have a nice day","Nice , talking to you"]

]

// Random for any other user input

const alternative = ["Same", "Go on...", "Try again", "I'm listening...", "I don't understand", "oh-oh.. I am not trained for that"]

// Whatever else you want :)

const coronavirus = ["Please stay home", "Wear a mask", "Fortunately, I don't have COVID", "These are uncertain times"]

function compare(triggerArray, replyArray, text) {
    let item;
    let itemFOund = false;
    for (let i = 0; i < triggerArray.length; i++) {
        for (let j = 0; j < replyArray.length; j++) {
            if (triggerArray[i][j] === text) {
                let items = replyArray[i];
                item = items[Math.floor(Math.random() * items.length)]
                itemFOund = true;
                break;
            }
        }
        if (itemFOund) {
            break;
        }
    }
    return item;
}

function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    text = text
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "");

    if (compare(prompts, replies, text)) {
        // Search for exact match in `prompts`
        product = compare(prompts, replies, text);
    } else if (text.match(/thank/gi)) {
        product = "You're welcome!"
    } else if (text.match(/(corona|covid|virus)/gi)) {
        // If no match, check if message contains `coronavirus`
        product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
    } else {
        // If all else fails: random alternative
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }
    addChat(input, product);
}

function addChat(input, product) {
    const messageContainer = document.getElementById("messages");
    let userDiv = document.createElement('div');
    userDiv.id = "user";
    userDiv.className = "user-response"
    userDiv.innerHTML = `<span id="user-response">${input}</span>`;
    messageContainer.appendChild(userDiv);

    let botDiv = document.createElement("div");
    let botText = document.createElement("span")
    botDiv.id = "bot";
    botDiv.className = "bot-response";
    botText.innerText = "typing ...";
    botDiv.appendChild(botText)
    messageContainer.appendChild(botDiv)

    messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    speak(product)

    setTimeout(() => {
        botText.innerText = `${product}`;

    }, 500)


}

function speak(text) {
    const u = new SpeechSynthesisUtterance();
    allVoices = speechSynthesis.getVoices();
    u.voice = allVoices.filter(voice => voice.name === "Athul")[0];
    u.text = text;
    u.lang = "en-US";
    u.volume = 1;
    u.rate = 1;
    u.pitch = 1;
    speechSynthesis.speak(u);
}
