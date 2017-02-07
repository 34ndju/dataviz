![Trends Image](https://www.dropbox.com/s/j1elc1pznrx2fjj/trends.png?raw=1)

[Google Trends](https://www.google.com/trends/) is cool...but it's pretty limited. What about all the trends before Google's inception?
Let's explore those with New York Times Trends.

A lot of this project was combining a few libraries and an API to create a sleek UI and useful API interation.

The NYT Archive API sends objects that follow this sample format:
'''
{
{
    "web_url":"http:\/\/www.nytimes.com\/interactive\/2016\/technology\/personaltech\/cord-cutting-guide.html",
    "snippet":"We teamed up with The Wirecutter to come up with cord-cutter bundles for movie buffs, sports addicts, fans of premium TV shows, binge watchers and families with children.",
    "lead_paragraph":"We teamed up with The Wirecutter to come up with cord-cutter bundles for movie buffs, sports addicts, fans of premium TV shows, binge watchers and families with children.",
    "abstract":null,
    "print_page":null,
    "blog":[],
    "source":"The New York Times",
    "multimedia":[{
        "width":190,
        "url":"images\/2016\/10\/13\/business\/13TECHFIX\/06TECHFIX-thumbWide.jpg",
        "height":126,
        "subtype":"wide",
        "legacy":{
            "wide":"images\/2016\/10\/13\/business\/13TECHFIX\/06TECHFIX-thumbWide.jpg",
            "wideheight":"126",
            "widewidth":"190"
            },
        "type":"image"
    },
    {
        "width":600,
        "url":"images\/2016\/10\/13\/business\/13TECHFIX\/06TECHFIX-articleLarge.jpg",
        "height":346,
        "subtype":"xlarge",
        "legacy":{"xlargewidth":"600","xlarge":"images\/2016\/10\/13\/business\/13TECHFIX\/06TECHFIX-articleLarge.jpg","xlargeheight":"346"},"type":"image"},{"width":75,"url":"images\/2016\/10\/13\/business\/13TECHFIX\/06TECHFIX-thumbStandard.jpg","height":75,"subtype":"thumbnail","legacy":{"thumbnailheight":"75","thumbnail":"images\/2016\/10\/13\/business\/13TECHFIX\/06TECHFIX-thumbStandard.jpg","thumbnailwidth":"75"},"type":"image"}],"headline":{"main":"The Definitive Guide to Cord-Cutting in 2016, Based on Your Habits","kicker":"Tech Fix"},"keywords":[{"rank":"1","is_major":"N","name":"subject","value":"Video Recordings, Downloads and Streaming"},{"rank":"2","is_major":"N","name":"subject","value":"Television Sets and Media Devices"},{"rank":"1","is_major":"Y","name":"subject","value":"Television"}],"pub_date":"2016-01-01T05:00:00Z","document_type":"multimedia","news_desk":"Technology \/ Personal Tech","section_name":"Technology","subsection_name":"Personal Tech","byline":{"person":[{"firstname":"Brian","middlename":"X.","lastname":"CHEN","rank":1,"role":"reported","organization":""}],"original":"By BRIAN X. CHEN"},"type_of_material":"Interactive Feature","_id":"57fdfb9895d0e022439c2b57","word_count":null,"slideshow_credits":null}
        
'''
