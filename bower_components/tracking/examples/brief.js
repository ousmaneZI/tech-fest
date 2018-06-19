window.onload = function() {
    var width = 393;
    var height = 295;
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var image1 = document.getElementById('image1');
    var image2 = document.getElementById('image2');

    window.descriptorLength = 256;
    window.matchesShown = 30;
    window.blurRadius = 3;

    var doMatch = function() {
      tracking.Brief.N = window.descriptorLength;

      context.drawImage(image1, 0, 0, width, height);
      context.drawImage(image2, width, 0, width, height);
  
      var imageData1 = context.getImageData(0, 0, width, height);
      var imageData2 = context.getImageData(width, 0, width, height);
  
      var gray1 = tracking.Image.grayscale(tracking.Image.blur(imageData1.data, width, height, blurRadius), width, height);
      var gray2 = tracking.Image.grayscale(tracking.Image.blur(imageData2.data, width, height, blurRadius), width, height);
  
     // var corners1 = tracking.Fast.findCorners(gray1, width, height);
     var corners1 = getData("Ousmane").data[0];
     corners1 = corners1.split(',').map(Number);
      //postData("Ousmane", corners1);
      var corners2 = tracking.Fast.findCorners(gray2, width, height);
      console.log("Doing Match corners1>>>: ", corners1);
      //console.log("Doing Match corners2>>>: ", corners2);
      var descriptors1 = tracking.Brief.getDescriptors(gray1, width, corners1);
      var descriptors2 = tracking.Brief.getDescriptors(gray2, width, corners2);
  
      var matches = tracking.Brief.reciprocalMatch(corners1, descriptors1, corners2, descriptors2);

      matches.sort(function(a, b) {
        return b.confidence - a.confidence;
      });
  
      for (var i = 0; i < Math.min(window.matchesShown, matches.length); i++) {
        var color = '#' + Math.floor(Math.random()*16777215).toString(16);
        context.fillStyle = color;
        context.strokeStyle = color;
        context.fillRect(matches[i].keypoint1[0], matches[i].keypoint1[1], 4, 4);
        context.fillRect(matches[i].keypoint2[0] + width, matches[i].keypoint2[1], 4, 4);

        context.beginPath();
        context.moveTo(matches[i].keypoint1[0], matches[i].keypoint1[1]);
        context.lineTo(matches[i].keypoint2[0] + width, matches[i].keypoint2[1]);
        context.stroke();

      }
    };

    doMatch();

    var gui = new dat.GUI();
    gui.add(window, 'descriptorLength', 128, 512).step(32).onChange(doMatch);
    gui.add(window, 'matchesShown', 1, 100).onChange(doMatch);
    gui.add(window, 'blurRadius', 1.1, 5).onChange(doMatch);
  }


  /*Addition*/
  function getData(who){
    var data = JSON.stringify({request: 'getFeatures', data:{"name": who}});
    var result = null;
      // convert object to json
      $.ajax({
        type: "POST",
        url: "/getData",
        dataType: "json",
        data: data,
        contentType: "application/json; charset=utf-8",
        success:function(resData){
          //alert(resData.status);
          console.log("Received data From GET:", resData); 
          result = resData;
				},
        error:  function(errMsg) {
					alert(errMsg);
                },
        async: false                
      }); 
      
      return result;
  }  
  function postData(who, corners){
      // convert object to json
      var data = JSON.stringify({request: 'addFeature', data:{"name": who, "corners": corners}});
      $.ajax({
        type: "POST",
        url: "/postData",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success:function(resData){
					alert(resData.status);
				},
        error:  function(errMsg) {
					alert(errMsg);
				}
      });  
  }
  