const update = (btn) => {
  const viewNum = btn.id.substring(8, 9);
  const gaugeNum = btn.id.substring(10, 11);
  const msgNum = btn.id.substring(12, );

  const prob = [];
  for (let x = 0; x <= 15; x++) {
    prob.push($('#prob-' + (btn.id.substring(8, )) + "-" + (x + 1)).val());
  }

  const request = {
    "url": `${views[viewNum - 1]}gauges/${gaugeNum}/messages/${msgNum}`,
    "type": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "message": "\"" + $('#input-' + (btn.id.substring(8, ))).val() + "\"",
      "probability": `\[${prob}\]`,
      "pass": "\"" + $('#passIn').val() + "\""
    }
  };

  $.ajax(request).done(function(response) {
    if (response.errors){
      alert(response.errors + " Please try again.");
    }
    console.log(response);
  });
}

const updateView = (btn) => {
  const viewNum = btn.id.substring(8, 9);
  const msgNum = btn.id.substring(10, 11);

  const prob = [];
  prob.push($('#prob-' + (btn.id.substring(8, )) + "-" + (1)).val());

  const request = {
    "url": `${views[viewNum - 1]}gauges/0/messages/${msgNum}`,
    "type": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "message": "\"" + $('#input-' + (btn.id.substring(8, ))).val() + "\"",
      "probability": `${prob}`,
      "pass": "\"" + $('#passIn').val() + "\""
    }
  };

  $.ajax(request).done(function(response) {
    if (response.errors){
      alert(response.errors + " Please try again.");
    }
    console.log(response);
  });
}

const makeButton = (id, div, text, ref) => {
  let upBtn = document.createElement("button");
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
  'http://localhost:3006/glyphs/5d4885f18227675bc73b98ac/'
]

views.forEach(view => {
  $.getJSON(view, function(data) {
    let viewMsgItr = 0;
    viewItr++;

    data.view.messages.forEach(element => {
      viewMsgItr++;

      const currentDiv = document.getElementById(data.name);

      makeTextInput("input-" + viewItr + "-" + viewMsgItr, currentDiv, element.text, null);
      makeNumInput("prob-" + viewItr + "-" + viewMsgItr + "-1", currentDiv, element.probability, null);

      // Create an update button and set it to post on click
      makeButton('post-btn' + viewItr + "-" + viewMsgItr, currentDiv, "Update", null);

      $('#post-btn' + viewItr + "-" + viewMsgItr).click(function() {
        updateView(this);
      });

      if (data.view.messages.indexOf(element) === data.view.messages.length - 1) {
        currentDiv.appendChild(document.createElement("BR"));
        makeButton('add-btn' + viewItr, currentDiv, "Add to View", null);
        viewMsgItr++;

        $('#add-btn' + viewItr).click(function() {
          const id = (this.id.substring(7, 8)) + "-" + (this.id.substring(9, ));

          makeTextInput("input-" + id + viewMsgItr, currentDiv, "", this);
          makeNumInput("prob-" + id + viewMsgItr + "-" + 1, currentDiv, 0, this);
          makeButton("post-btn" + id + viewMsgItr, currentDiv, "Update", this);

          document.getElementById("post-btn" + id + viewMsgItr).addEventListener("click", function() {
            updateView(this);
          });

          currentDiv.insertBefore(document.createElement("BR"), this);
        });
      }
      currentDiv.appendChild(document.createElement("BR"));
    });
    data.view.gauges.forEach(gauge => {
      let gaugeItr = 0;
      gaugeItr++;
      let messageItr = 0;

      currentDiv = document.getElementById(data.name);

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

        $('#post-btn' + viewItr + "-" + gaugeItr + "-" + messageItr).click(function() {
          update(this);
        });

      })
      currentDiv.appendChild(document.createElement("BR"));
      makeButton('add-btn' + viewItr + '-' + gaugeItr, currentDiv, "Add to Gauge", null);

      $('#add-btn' + viewItr + '-' + gaugeItr).click(function() {
        messageItr++;
        const id = (this.id.substring(7, 8)) + "-" + (this.id.substring(9, )) + "-" + messageItr;

        makeTextInput("input-" + id, currentDiv, "", this);

        for (const x of Array(5).keys()) {
          makeNumInput("prob-" + id + "-" + (x + 1), currentDiv, 0, this);
        }

        makeButton("post-btn" + id, currentDiv, "Update", this);

        document.getElementById("post-btn" + id).addEventListener("click", function() {
          update(this);
        });

        currentDiv.insertBefore(document.createElement("BR"), this);
      });
    });
  });
});
