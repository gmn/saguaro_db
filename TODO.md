
TODO:
  - gif arrows indicating sortng direction
  - pictures for all main objects
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
  - github project
  - pretty it up some, use Bootstrap, whatever works best
  - convert to Angular project
  - google ads
  - advertise on STARGAZERSLOUNGE and CLOUDYNIGHTS


  - explanations of every field in the table
  - mouse-over TITLE explanations of fields (in table header)

  - graphical <canvas> project that shows every object in relation to constellations
  - little placeholder animated GIF that shows "working" or "in progress"
    * put in own frame, so that thread continues to work, while new table
      is being constructed
    * how to do overlay and tint the background (display GIF over table)

  - fix Queryable '$and' attribute 
    (Object can't have have duplicate key in strict mode)
    * find queryable bug in computing multiple AND statements
      find( { 'mag': {$lte: 18}, 'mag': {$gt: 17} } );
