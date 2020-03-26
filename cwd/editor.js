const makeButton = (id, div, text) => {
  let upBtn = document.createElement("BUTTON");
  upBtn.setAttribute("type", "button");
  upBtn.setAttribute("id", id)
  upBtn.innerHTML = text
  div.appendChild(upBtn);
};

const makeRadioButton = (id, div, text) => {
  let radBtn = document.createElement("INPUT");
  radBtn.setAttribute("type", "radio");
  radBtn.setAttribute("id", id);
  radBtn.setAttribute("name", "upload");

  let label = document.createElement("LABEL");
  label.setAttribute("for", id);
  label.innerHTML = text;

  div.appendChild(label);
  div.appendChild(radBtn);
};

const makeTextInput = (id, div, text) => {
  let messageText = document.createElement("INPUT");
  messageText.setAttribute("id", id);
  messageText.setAttribute("type", "text");
  messageText.setAttribute("value", text);
  messageText.setAttribute("size", 85);
  div.appendChild(messageText);
};

const makeNumInput = (id, div, num) => {
  let messageProb = document.createElement("INPUT");
  messageProb.setAttribute("id", id);
  messageProb.setAttribute("type", "number");
  messageProb.setAttribute("value", num);
  messageProb.setAttribute("size", 1);
  div.appendChild(messageProb);
}

let viewItr = 0;
const views = ['http://localhost:3006/glyphs/5d3744e584687c30ef9e5b47/', 'http://localhost:3006/glyphs/5d37452784687c30ef9e5b48/',
'http://localhost:3006/glyphs/5d4885f18227675bc73b98ac/']

views.forEach(view => {$.getJSON(view, function(data) {
  let viewMsgItr = 0;

  data.view.messages.forEach(element => {
    viewItr++;
    viewMsgItr++;
    let gaugeItr = 0;

    const currentDiv = document.getElementById(data.name);

    makeTextInput("input-" + viewItr + "-" + viewMsgItr, currentDiv, element.text);
    makeNumInput("prob-" + viewItr + "-" + viewMsgItr + "-1", currentDiv, element.probability);

    // Create an update button and set it to post on click
    makeButton('post-btn' + viewItr + "-" + viewMsgItr, currentDiv, "Update");

    $('#post-btn' + viewItr + "-" + viewMsgItr).click(function(){
      const viewNum = this.id.substring(8,9);
      const msgNum = this.id.substring(10,11);

      const prob = [];
      prob.push($('#prob-' + (this.id.substring(8,)) + "-" + 1 ).val());

      const settings = {
        "url": views[viewNum - 1] + "messages/" + msgNum,
        "type": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "message":"\"" + $('#input-' + (this.id.substring(8,))).val() + "\"",
          "probability": `\[${prob}\]`
        }
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    });

    data.view.gauges.forEach(gauge => {
      gaugeItr++;
      let messageItr = 0;

      if (typeof(gauge.messages) == 'undefined') {
        return
      }

      gauge.messages.forEach(message => {
        messageItr++;

        currentDiv.appendChild(document.createElement("BR"));

        makeTextInput("input-" + viewItr + "-" + gaugeItr + "-" + messageItr, currentDiv, message.text);

        let numItr = 0;
        message.probability.forEach(prob => {
          numItr++;
          makeNumInput("prob-" + viewItr + "-" + gaugeItr + "-" + messageItr + "-" + numItr, currentDiv, prob);
        })


        makeButton('post-btn' + viewItr + "-" + gaugeItr + "-" + messageItr, currentDiv, "Update");

        $('#post-btn' + viewItr + "-" + gaugeItr + "-" + messageItr).click(function(){
          const viewNum = this.id.substring(8,9);
          const gaugeNum = this.id.substring(10,11);
          const msgNum = this.id.substring(12,);

          const prob = [];
          for (const x of Array(5).keys()) {
            prob.push($('#prob-' + (this.id.substring(8,)) + "-" + (x+1) ).val());
          }

          const settings = {
            "url": views[viewNum - 1] + "gauges/" + gaugeNum + "/messages/" + msgNum,
            "type": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
              "message":"\"" + $('#input-' + (this.id.substring(8,))).val() + "\"",
              "probability": `\[${prob}\]`
            }
          };

          $.ajax(settings).done(function (response) {
            console.log(response);
          });
        });

      })

    })

  })
});
});

currentDiv = document.getElementById('finalButtons');
makeButton("get-csv", currentDiv, "Upload CSV");
$('#get-csv').on('click', function() {
    $('#file-input').trigger('click');
});

makeRadioButton("overwrite", currentDiv, "Overwrite");
makeRadioButton("append", currentDiv, "Append");
