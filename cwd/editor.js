const makeButton = (id, div, text, ref) => {
  let upBtn = document.createElement("BUTTON");
  upBtn.setAttribute("type", "button");
  upBtn.setAttribute("id", id)
  upBtn.innerHTML = text

  if (ref) {
    div.insertBefore(upBtn, ref)
  } else {
    div.appendChild(upBtn);
  }
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

const makeTextInput = (id, div, text, ref) => {
  let messageText = document.createElement("INPUT");
  messageText.setAttribute("id", id);
  messageText.setAttribute("type", "text");
  messageText.setAttribute("value", text);
  messageText.setAttribute("size", 85);

  if (ref) {
    div.insertBefore(messageText, ref)
  } else {
    div.appendChild(messageText);
  }
};

const makeNumInput = (id, div, num, ref) => {
  let messageProb = document.createElement("INPUT");
  messageProb.setAttribute("id", id);
  messageProb.setAttribute("type", "number");
  messageProb.setAttribute("value", num);
  messageProb.setAttribute("size", 1);

  if (ref) {
    div.insertBefore(messageProb, ref)
  } else {
    div.appendChild(messageProb);
  }
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

    makeTextInput("input-" + viewItr + "-" + viewMsgItr, currentDiv, element.text, null);
    makeNumInput("prob-" + viewItr + "-" + viewMsgItr + "-1", currentDiv, element.probability, null);

    // Create an update button and set it to post on click
    makeButton('post-btn' + viewItr + "-" + viewMsgItr, currentDiv, "Update", null);

    $('#post-btn' + viewItr + "-" + viewMsgItr).click(function(){
      const viewNum = this.id.substring(8,9);
      const msgNum = this.id.substring(10,11);

      const prob = [];
      prob.push($('#prob-' + (this.id.substring(8,)) + "-" + 1 ).val());

      const settings = {
        "url": views[viewNum - 1] + "gauges/0/messages/" + msgNum,
        "type": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "message":"\"" + $('#input-' + (this.id.substring(8,))).val() + "\"",
          "probability": `\[${prob}\]`,
          "pass": "\"" + $('#passIn').val() + "\""
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

        makeTextInput("input-" + viewItr + "-" + gaugeItr + "-" + messageItr, currentDiv, message.text, null);

        let numItr = 0;
        message.probability.forEach(prob => {
          numItr++;
          makeNumInput("prob-" + viewItr + "-" + gaugeItr + "-" + messageItr + "-" + numItr, currentDiv, prob, null);
        })


        makeButton('post-btn' + viewItr + "-" + gaugeItr + "-" + messageItr, currentDiv, "Update", null);

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
              "probability": `\[${prob}\]`,
              "pass": "\"" + $('#passIn').val() + "\""
            }
          };

          $.ajax(settings).done(function (response) {
            console.log(response);
          });
        });

      })
      currentDiv.appendChild(document.createElement("BR"));
      makeButton('add-btn' + viewItr + '-' + gaugeItr, currentDiv, "Add", null);

      $('#add-btn' + viewItr + '-' + gaugeItr).click(function() {
        messageItr++;
        makeTextInput("input-" + viewItr + "-" + gaugeItr + "-" + messageItr, currentDiv, "", this);
        makeButton('post-btn' + viewItr + "-" + gaugeItr + "-" + messageItr, currentDiv, "Update", this);
        currentDiv.insertBefore(document.createElement("BR"), this)
      })
    })
  })
});
});

currentDiv = document.getElementById('finalButtons');
makeButton("get-csv", currentDiv, "Upload CSV", null);
$('#get-csv').on('click', function() {
    $('#file-input').trigger('click');
});

makeRadioButton("overwrite", currentDiv, "Overwrite");
makeRadioButton("append", currentDiv, "Append");
