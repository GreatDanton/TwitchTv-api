$('document').ready(function() {
  var state;
  var url;
  var mainUrl = 'https://api.twitch.tv/kraken/streams/';
  var usersUrl = 'https://api.twitch.tv/kraken/channels/';
  var users = ["freecodecamp", "storbeck","ESL_SC2", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin"];


var streamerInfo = [];

  // for each user get his name, logo and state
  for (i = 0; i < users.length; i++) {
    (function(i) {
    var user = users[i];
    $.getJSON(mainUrl + user, function(data) {
      if (data.stream !== null) {
          var url = data.stream.channel.url;
          var state = data.stream.game;
          var name = data.stream.channel.display_name;
          var logo = data.stream.channel.logo;        
          streamerInfo.push([name, logo, state, url]);
      } else {
        $.getJSON(usersUrl + user, function(offdata) {
          var name = offdata['display_name'];
              var state = 'Offline';
              if (offdata.logo !== null) {
                    var logo = offdata.logo;
                  } else {
                    var logo = 'http://dev.bukkit.org/thumbman/avatars/14/772/160x166/man_wearing_hat_silhouette.png.-m0.png';
                  }
                  var url = offdata.url;
              streamerInfo.push([name, logo, state, url]);
      });
      }
    }).error(function(xhr) {
      if(xhr.status === 422) {
        var name = users[i];
        var state = "Account Deleted";
        var logo =  'http://dev.bukkit.org/thumbman/avatars/14/772/160x166/man_wearing_hat_silhouette.png.-m0.png';
        var url = '#';
        streamerInfo.push([name, logo, state, url]);
      };
    });
  })(i);
}

// waits for all data then appends:
$(document).ajaxStop(function() {
      $('.people').html('');
      for (i = 0; i < users.length; i++) {
      $('.people').append("<a target='_blank' href='"+ streamerInfo[i][3] + "'>" + "<div class='streamer'><img class='image' src='" + streamerInfo[i][1] + "'><div class='middle-container'><div class='name'>" +streamerInfo[i][0] + "</div>" + "<div class='state'>" + streamerInfo[i][2] + "</div></div></div></a>");
    }
});

// used for appending data to people container
function searchFunc() {
      $('.people').append("<a target='_blank' href='"+ streamerInfo[i][3] + "'>" + "<div class='streamer'><img class='image' src='" + streamerInfo[i][1] + "'><div class='middle-container'><div class='name'>" +streamerInfo[i][0] + "</div>" + "<div class='state'>" + streamerInfo[i][2] + "</div></div></div></a>");
}

function searchFunc2() {
      $('.people').append("<a target='_blank' href='"+ searchArr[i][3] + "'>" + "<div class='streamer'><img class='image' src='" + searchArr[i][1] + "'><div class='middle-container'><div class='name'>" +searchArr[i][0] + "</div>" + "<div class='state'>" + searchArr[i][2] + "</div></div></div></a>");
}

var searchArr = streamerInfo;
// search field:
$('#search').keyup(function() {
  var searchTerm = $('#search').val().toLowerCase();
  $('.people').html('');
  for (i=0; i<searchArr.length; i++) {
    if (searchArr[i][0].toLowerCase().indexOf(searchTerm) > -1) {
      searchFunc2();
    }
  }
});

  // moves arrow to clicked button & filters data
  $('#first').click(function() {
    $('#search').val('');
    $('#first > .arrow').removeClass('none');
    $('#first').addClass('active');
    $('#second > .arrow').addClass('none');
    $('#second').removeClass('active');
    $('#third > .arrow').addClass('none')
    $('#third').removeClass('active');
    searchArr = streamerInfo;
    $('.people').html('');
    for (i = 0; i < streamerInfo.length; i++) {
    searchFunc();
  }
  });

  $('#second').click(function() {
    $('#search').val('');
    $('#second > .arrow').removeClass('none');
    $('#second').addClass('active');
    $('#first > .arrow').addClass('none');
    $('#first').removeClass('active');
    $('#third > .arrow').addClass('none')
    $('#third').removeClass('active');
    searchArr = [];
    $('.people').html('');
    for (i=0; i<streamerInfo.length; i++) {
      if (streamerInfo[i][2].indexOf('Offline') === -1 && streamerInfo[i][2].indexOf('Account') === -1) {
        searchArr.push(streamerInfo[i]);
        searchFunc();
      }
    }
  });

  $('#third').click(function() {
    $('#search').val('');
    $('#third > .arrow').removeClass('none');
    $('#third').addClass('active');
    $('#first > .arrow').addClass('none');
    $('#first').removeClass('active');
    $('#second > .arrow').addClass('none')
    $('#second').removeClass('active');
    $('.people').html('');
    searchArr = [];
    for (i=0; i<streamerInfo.length; i++) {
      if (streamerInfo[i][2].indexOf('Offline') > -1 || streamerInfo[i][2].indexOf('Account') > -1) {
        searchArr.push(streamerInfo[i]);
        searchFunc();
      }
    }
  });


// end of file
});
