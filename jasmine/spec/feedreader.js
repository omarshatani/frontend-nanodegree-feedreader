/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // RSS Feeds Suite
    describe('RSS Feeds', function() {
        // Checks if the feed container is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        // Checks if feed's url are defined and not empty
        it('URLs are defined', function () {
            for (feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });
        // Checks if feed's name are defined and not empty
        it('Names are defined', function () {
            for (feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });
    // Menu Test Suite
    describe('The menu', function () {
        const body = document.querySelector('body');
        // Checks if the menu is hidden initially
        it('is hidden', function () {
            expect(body.classList.value).toBe('menu-hidden');
        });
        // Checks if the menu becomes hidden/visible on click
        it('changes visibility when the menu icon is clicked', function() {
            const iconMenu = document.querySelector('.icon-list');
            iconMenu.click();
            expect(body.classList.value).not.toBe('menu-hidden');
            iconMenu.click();
            expect(body.classList.value).toBe('menu-hidden');
        });
    });
    // Initial Entries Test Suite
    describe('Initial Entries', function () {
        // Array that contains the feeds of the first (0) entry
        let feeds = [];
        /* In this function we load the enties and push them into 
         * the feeds array. Since loadFeed is an asyncronous function,
         * we use the done() function to notify Jasmine when loadFeed
         * has finished her work.
        */
        beforeEach(function (done) {
            loadFeed(0, function () {
                let entries = document.querySelectorAll('.entry');
                for (entry of entries) {
                    feeds.push(entry);
                }
                done();
            });
        });
        // Checks if there's at least an entry in the feed array
         it('at least a single entry within the feed container', function (done) {
            expect(feeds.length).toBeGreaterThan(0);
            done();
         });
    });
    // New Feed Selection Test Suite
    describe('New Feed Selection', function () {
        /* These two entries will be used to see
         * if the content actually changes after
         * new feed selection
        */
        let entryA, entryB;
        /* Here we load entry 0 and 1, and assign their first feed 
         * text content to entryA and entryB respectively.
        */
        beforeEach(function (done) {
            loadFeed(0, function () {
                entryA = document.querySelector('.entry').innerText;
            });
            loadFeed(1, function () {
                entryB = document.querySelector('.entry').innerText;
                done();
            });
        });
        // Checks if the content of the two feed are actually different
        it('content changes after feed loaded', function (done) {
            expect(entryA !== entryB).toBeTruthy();
            done();
        });
    });
        
}());
