
TODO:
  - save in localData, check localData on page-load, if not exist, Ajax-get 3-megabyte Database file

  - set up to work with other Saguaro DB files, and DB files from other places
    (via dropdown. Just overwrite existing localData)

  - text input field that queries "notes" field, can do:
    * onkeydown() start timer, 3 seconds, 
    * after 3 seconds, if text changed, fire lookup. 
    * reset keydown variable. if keydown again, start timer again.
    * Every key stroke, reset timer to 3 sec
    * also query "object" and "other" fields, so you can type: "M11"

  - printout field that summarizes query constraints
      build_report() {
        // go through drop-downs, query their settings,
      }

  STYLING:
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

  - control panel section w/ dropdowns to set each individual query field, 

  - download link to retrieve generated output, in CSV, JSON

  - convert to Angular project

  - google ads

  - advertise on STARGAZERSLOUNGE and CLOUDYNIGHTS

  - graphical <canvas> project that shows every object in relation to constellations
  - little placeholder animated GIF that shows "working" or "in progress"
    * put in own frame, so that thread continues to work, while new table
      is being constructed
    * how to do overlay and tint the background (display GIF over table)

  - fix Queryable '$and' attribute 
    (Object can't have have duplicate key in strict mode)
    * find queryable bug in computing multiple AND statements
      find( { 'mag': {$lte: 18}, 'mag': {$gt: 17} } );


