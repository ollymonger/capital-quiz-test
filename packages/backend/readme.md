See [../../README.md](Parent readme) for installation and run steps.

### Backend considerations:

- Data structure will be in the following format:
  `{"name":"Country_name","capital":"Capital_name","iso2":"ISO","iso3":"ISO"}`
- Correct answer must not be viewable within the network tab.
- Some countries do not have a capital.
- There is an error boolean & message string on the response object. The difference between a valid call, and an errored called is: - No data present on errored object, error=true, msg reflects the error.
