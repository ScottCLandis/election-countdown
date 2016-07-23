$(document).ready(function () {
    $('#clock').countdown('2016/11/08 08:00:00')
        .on('update.countdown', function (event) {
            var format = '%H Hours %M Minutes %S Seconds  <br> Until Election Day';
            var days = '%D  Days <br> Until Voting Starts'
            if (event.offset.weeks > 1) {
                days;
            } else {
                days = format;
            }
            $(this).html(event.strftime(days));
        })
        .on('finish.countdown', function (event) {
            $(this).html('Vote today!')
                .parent().addClass('disabled');

        });
    var spreadsheetID = "1n4Hv9LE1F8Ku3_ak-Uv04t8fvga77adnEpqsTxJ37Aw";

    // google sheet  
    var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";


    $.get(url)
        .done(function (data) {

            var entry = data.feed.entry.reverse();

            console.log(entry);
            for (var i = entry.length - 1; i >= 0; i -= 1) {
                var state = entry[i]['gsx$state']['$t'];
                var abr = entry[i]['gsx$abbreviation']['$t'];
                var registerurl = entry[i]['gsx$register']['$t'];
                var date = entry[i]['gsx$due-date']['$t'];
                var online = entry[i]['gsx$online']['$t'];
                var info = entry[i]['gsx$info']['$t'];

                $(".main-contain").append("<div class=\"state-info\" id=" + abr + "\"><div class=\"text\"><div class=\"states\"><span class=\"state\">" + state + "</span> <span class=\"link\"><a href=\"" + registerurl + "\">Register Here</a></span> </div><div class=\"info\"><span class=\"date\">" + date + "</span> | <span class=\"online\">Can you register online?: " + online + "</span><br><span class=\"info\">Additional Info " + info + "</span></div>  </div> </div>");

            }
            if (info == '') {
                $(".info").addClass("hidden");
            }
        });
});