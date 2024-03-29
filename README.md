# extensio

Making browser extensions a breeze.

Browser extensions are a really neat way of integrating straight into web browser UI, a place people are spending an increasing amount of time, while also offering a unique opportunity to embed actions directly into the familiar UI of services like Twitter and Facebook.

However, the API differences between Chrome, Firefox and Safari are vast. This is an attempt to create a library that removes these differences and makes extension development easier and quicker.

## Usage

Right now extensio is not really worth using, but keeps tabs on how it's getting on. (Or, even better, contribute!)

## Get involved

Building extensio is done via [grunt](https://github.com/cowboy/grunt).

To add funcitonality, the `src/` directory should hold everything you need. That code is reasonably well documented, and is structured much like the jQuery source.

To test extensio as an extension you need to use the appropriate development method for each browser using the folders in `test/`. For example, in Chrome, add `test/chrome/` as an unpacked extension, and then inspect the background page. In the console you see the results of the tests.

## Questions

#### There are other libraries like it out there, why start fresh?

The others out there either seem undertested and underdeveloped, or they present themselves a platforms rather than a library. It's very important that extensio does not limit the extension author, and that it is very well tested so that it's safe for production and deployment to thousands of users.

#### Do you intend to provide 100% coverage?

No. That would be impossible, or I'd have to be insane to try.

## License

extensio is distributed using the MIT License.