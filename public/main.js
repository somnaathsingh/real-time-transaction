const form = document.getElementById('vote-form');
var event;

form.addEventListener('submit', e=>{
    
    const username = document.querySelector('input[id=username]').text;
    const amount = document.querySelector('input[id=amount]').text;
    const date = document.querySelector('input[id=date]').text;
    const data = {username: username,amount:amount,date:date};

    fetch('http://localhost:3000/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .catch(err => console.log(err));

    e.preventDefault();
});
fetch("http://localhost:3000/poll")
    .then(res => res.json())
    .then(data => {
        let username = data.username;
        let amount = data.amount;
        let date = data.date;
        document.querySelector('#card-title').innerHTML = `Username: ${username}`;
        document.querySelector('#card-subtitle').innerHTML = `Amount: ${amount}`;
        document.querySelector('#card-text').innerHTML = `Date: ${date}`;
        Pusher.logToConsole = true;
        
             var pusher = new Pusher('03d937d6cbda21480bfb', {
               cluster: 'ap2',
               encrypted: true
             });
         
             var channel = pusher.subscribe('os-poll');

             channel.bind('os-vote', function(data) {
                const transactionsList = document.getElementById('posts-list');
            transactionsList.insertBefore(createPostCard(data.transaction), transactionsList.firstChild);
        });
    
        function createTransactionCard(post) {
            let cardElement = document.querySelector('.card');
            let newCard = cardElement.cloneNode(true);
            newCard.querySelector('.card-title').innerText = transaction.username;
            // we wrap the date here and call toString() 
            // because RethinkDB returns it in a different format for changefeeds
            newCard.querySelector('.card-subtitle').innerText =transaction.amount;
            newCard.querySelector('.card-text').innerText = transaction.date;
            return newCard;
        }});
        


        