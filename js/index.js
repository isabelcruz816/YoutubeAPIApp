let nextPageToken = null;
let prevPageToken = null;

function getVideoList(token) {
  const input = $('#keyWord').val();
  let url;
  if (!token) {
    url = `https://www.googleapis.com/youtube/v3/search?q=${input}&part=snippet&key=AIzaSyDpGTxZFZOq-fjmjcBQR7FSHfFFgfIixJU&type:video&maxResults=10`;
  } else {
    url = `https://www.googleapis.com/youtube/v3/search?q=${input}&part=snippet&key=AIzaSyDpGTxZFZOq-fjmjcBQR7FSHfFFgfIixJU&type:video&maxResults=10&pageToken=${token}`;
  }
  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: function(responseJSON) {
      console.log(responseJSON);
      prevPageToken = responseJSON.prevPageToken;
      nextPageToken = responseJSON.nextPageToken;
      if (input != '') {
        if (!prevPageToken) {
          console.log('no tengo valor');
          $('#prevBtn').css('display', 'none');
        } else {
          $('#prevBtn').css('display', 'inline');
        }
        if (!nextPageToken) {
          $('#nextBtn').css('display', 'none');
        } else {
          $('#nextBtn').css('display', 'inline');
        }
        responseJSON.items.forEach(item => {
          console.log(item.id.videoId);
          $('#videosList').append(
            `<li id="${item.id.videoId}" class="video"> 
              <h1>${item.snippet.title}</h1>
                <img src="${item.snippet.thumbnails.medium.url}"/></li>`,
          );
        });
      }
    },
    error: function(err) {
      console.log(err);
    },
  });
}

function main() {
  $('#videosList').on('click', 'li img, li h1', function() {
    const videoID = $(this)
      .parent()
      .attr('id');
    window.open(`https://www.youtube.com/watch?v=${videoID}`);
  });
  $('#searchBtn').on('click', event => {
    event.preventDefault();
    $('ul').empty();
    getVideoList('');
  });

  $('#prevBtn').click(function() {
    event.preventDefault();
    $('ul').empty();
    getVideoList(prevPageToken);
  });

  $('#nextBtn').click(function() {
    event.preventDefault();
    $('ul').empty();
    getVideoList(nextPageToken);
  });
}
main();
