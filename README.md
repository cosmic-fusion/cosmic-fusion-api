# Cosmic Fusion API

Welcome to the Cosmic Fusion API documentation. This contains contains all of the documentation for each endpoint.

# Endpoints

Below is a list of all the available endpoints and how to use them.

## GetProfile

This endpoint takes **two** query strings and returns the metadata of an individual:

1. `dob`
2. `sex_at_birth`

Note: `dob` structure is `dd/mm/yyyy`

> Structure
api.cosmicfusions.com/get-profile?dob=${dob}&sex_at_birth=${sex_at_birth}

> Example usage
api.cosmicfusions.com/get-profile?dob=01/01/1900&sex_at_birth=1

### Expected Output

```
{
   "statusCode":200,
   "headers":{
      "Content-Type":"application/json"
   },
   "body":[
      {
         "characterProfileId":1088,
         "animalId":3,
         "elementId":0,
         "westernId":10,
         "summary":"Conscientious charmers. Aside from being unusually sensitive for a Capricorn girl these cuties are nigh on perfect. They have the strength, drive and ambition of the Capricorn/Metal angle and the compassion and general sweet-as-candy characteristics of the Pig. They are pretty single minded in many respects and have a seriously creative bent aligned with a very grounded, common sense business brain. It wouldn't surprise terribly if they ran their own very creative, very successful venture. These girls really are over burdened with a catalogue of fab traits and they're also ridiculously organised. Something of an uber star then? Yes, kind of. Capricorn Metal Pigs certainly have huge potential and when you're conscientious, organised and talented you tend not to fail. They'll be modest though, this isn't an all-singing, all-dancing ego-fest, they just know what they want and knuckle down. Their charm tends to reveal itself when they relax, they can be quite serious where work is concerned so the social side is something of a 'release' and you discover this gorgeous charming, girly thing. They really are a bit special. Lovely.",
         "sex":1,
         "trio":"Capricorn Metal Pig"
      }
   ]
}
```

> Both the **GetProfile** and **GetYear** endpoints also take negative integers as years, which translate to BC. For example getting the profile of Julius Caesar, born on 12th July 100 BC, would be in the following format:

`api.cosmicfusions.com/get-profile?dob=12/07/-100&sex_at_birth=0`


## GetYear

This endpoint takes **one** querystring and returns metadata about that day, month and year:

1. `date`

Note: `date` structure is `dd/mm/yyyy`

> Structure
api.cosmicfusions.com/get-year?date=${date}

> Example usage
api.cosmicfusions.com/get-year?date=01/01/1900

### Expected Output

```
{
   "statusCode":200,
   "headers":{
      "Content-Type":"application/json"
   },
   "body":{
      "western":"Capricorn",
      "westernId":10,
      "element":"Metal",
      "elementId":0,
      "animal":"Pig",
      "animalId":3,
      "sex":0,
      "trio":"Capricorn Metal Pig",
      "element_animal_duo":"Metal Pig",
      "start_date":"30/01"
   }
}
```

## GetCelebs

This endpoint takes no query strings and returns an array of celebrities listed in the database

> Structure
api.cosmicfusions.com/get-celebs

> Example usage
api.cosmicfusions.com/get-celebs

### Expected Output
```
{
   "statusCode":200,
   "headers":{
      "Content-Type":"application/json"
   },
   "body":[
      {
         "name":"Brad Pitt",
         "description":"some description",
         "dateOfBirth":"1963-12-18T00:00:00.000Z",
         "sex":0,
         "animal_id":7,
         "element_id":2,
         "western_id":9,
         "image":"https://s3-eu-west-1.amazonaws.com/snowflake-2015/_6264840531431593370bradd_pitt.jpg"
      },
      {
         "name":"Michael Phelps",
         "description":"some description",
         "sex":0,
         "animal_id":5,
         "element_id":4,
         "western_id":4,
         "image":"https://s3-eu-west-1.amazonaws.com/snowflake-2015/_9800884271431594155michael_phelps.jpg"
      }
      ...
    ]
}
```

## GetFriend

This endpoint takes **four** query strings and returns data on two individuals:

1. `dob`
2. `sex_at_birth`
3. `friend_dob`
4. `friend_sex_at_birth`

> Structure
api.cosmicfusions.com/get-friend?dob=${dob}&sex_at_birth=${sex_at_birth}&friend_dob=${friend_dob}&friend_sex_at_birth=${friend_sex_at_birth}

> Example usage
api.cosmicfusions.com/get-friend?dob=01/01/1900&sex_at_birth=0&friend_dob=01/01/1900&friend_sex_at_birth=1

### Expected Output
```
{
   "statusCode":200,
   "headers":{
      "Content-Type":"application/json"
   },
   "body":{
      "combination_1":"Capricorn Metal Pig",
      "combination_2":"Capricorn Metal Pig",
      "character_profile_1":"Okay, he may be a complete softie and an apparent pacifist but don't be misled, he's a seriously ambitious, driven character with a killer charm. As with all Capricorn men, money is the spur. They deny it, of course, but it's inherent and that, alongside a terrific work ethic, results in Mr Understated making serious waves in the world of work. Capricorn men do have one Achilles heel - they can't handle confrontation and have no idea how to deal with emotion. To counter this they do tend to lay on the charm. It's an impressive weapon really, because these apparently strong characters are incredibly sensitive and try desperately hard to conceal the fact. Capricorn Metal Pigs are nowhere near as assured as they appear and need a welter of reassurance, love and encouragement to truly achieve their goals. Where these boys genuinely come into their own is when fatherhood enters the fray. Two things, firstly they love it - if anyone could be a stay-at-home dad, it's these characters. Secondly, it comes so naturally to them. Ambitious they may be but a rural setting with a soulmate and the aforementioned clan is equally appealing to these beautiful men.",
      "character_profile_2":"Conscientious charmers. Aside from being unusually sensitive for a Capricorn girl these cuties are nigh on perfect. They have the strength, drive and ambition of the Capricorn/Metal angle and the compassion and general sweet-as-candy characteristics of the Pig. They are pretty single minded in many respects and have a seriously creative bent aligned with a very grounded, common sense business brain. It wouldn't surprise terribly if they ran their own very creative, very successful venture. These girls really are over burdened with a catalogue of fab traits and they're also ridiculously organised. Something of an uber star then? Yes, kind of. Capricorn Metal Pigs certainly have huge potential and when you're conscientious, organised and talented you tend not to fail. They'll be modest though, this isn't an all-singing, all-dancing ego-fest, they just know what they want and knuckle down. Their charm tends to reveal itself when they relax, they can be quite serious where work is concerned so the social side is something of a 'release' and you discover this gorgeous charming, girly thing. They really are a bit special. Lovely.",
      "summary":"Hold on - don't fret, sweat or commence a mini-meltdown!\r\nThe point of the 1440 system is to act as a barometer - no more.  Anyone who finds themselves in the 0-30% bracket shouldn't for a moment consider their relationship as irreversibly flawed - it isn't but it does require much more effort in you two 'understanding, appreciating and comprehending' one another's characters.",
      "compatibility_score":7
   }
}
```

# Improvements

Please submit a pull request with any suggested improvements.