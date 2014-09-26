
TODO:
  X pre-load screen that says: "Please be patient. This project is approx 3.5 megabytes and will take a second to load. Once it has downloaded however, everything in the app takes places entirely in your browser's memory."

  - About link: popup, toggled
    "This is a very simple project that puts the query tools right in the browser, enabling the user to constrain the database however they may see fit. It is intended as a viewing aid, something that you can take outside and use along side a telescope and star chart. Uranometria page numbers are provided for all objects. 

I wrote this in nearly pure javascript, using a minimum of external dependencies -- What you see is what you get. It is based entirely on the Saguaro Astronomy Club's Deep Sky Objects database that is the cumulation of a dozen year's effort. This database is provided free of charge by the Saguaro Astronomy club: <a href="http://saguaroastro.org">saguaroastro.org</a>.

Any questions, comments, suggestions for improvement can be sent uninhibitedly to <a href="mailto:greg@naughton.org">greg@naughton.org</a>. I appreciate your looking at it and sincerely hope you enjoy using it."

  - test in IE
  - clarify copyrights, Saguaro Astro for their DB version 8.1, and Gregory Naughton for this Interactive version.

  - save in localData, check localData on page-load, if not exist, Ajax-get 3-megabyte Database file

  - set up to work with other Saguaro DB files, and DB files from other places
    (via dropdown. Just overwrite existing localData)

  - STYLING:
    * gif arrows indicating sortng direction
    * explanations of every field in the table
    * mouse-over TITLE explanations of fields (in table header)
    * pictures for main objects
    * pretty it up some, use Bootstrap, whatever works best

  - specific fields in DB for 
    - Hershell
    - UGC
    - IC
    - HGC
    - Messier
    - Caldwell
    - coloquial/common names

  - download link to retrieve generated output, in CSV, JSON

  - convert to Angular project

  - google ads

  - advertise on STARGAZERSLOUNGE and CLOUDYNIGHTS

  - graphical <canvas> project that shows every object in relation to constellations

--------------------------------------------------------------------------
  X text input field that queries "notes" field, can do:
    * onkeydown() start timer, 3 seconds, 
    * after 3 seconds, if text changed, fire lookup. 
    * reset keydown variable. if keydown again, start timer again.
    * Every key stroke, reset timer to 3 sec
    * also query "object" and "other" fields, so you can type: "M11"
  X printout field that summarizes query constraints
      build_report() {
        // go through drop-downs, query their settings,
      }
  X control panel section w/ dropdowns to set each individual query field, 
  X little placeholder animated GIF that shows "working" or "in progress"
    * put in own frame, so that thread continues to work, while new table
      is being constructed
    * how to do overlay and tint the background (display GIF over table)


