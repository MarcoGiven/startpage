/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"ZyzpxsndTQBMjSCR","label":"college","bookmarks":[{"id":"sAxO4vuhzsTgqAZf","label":"canvas","url":"https://templeu.instructure.com/"},{"id":"SOaAyZWXQdeMBEul","label":"outlook","url":"https://outlook.office365.com/mail/"},{"id":"caV1bXI1xHV0recK","label":"teams","url":"https://teams.microsoft.com/v2/"},{"id":"B1Tbs3uQB0olv2zS","label":"portal","url":"https://tuportal6.temple.edu/group/home/home"}]},{"id":"JWRPH0PaiwWMWur7","label":"programming","bookmarks":[{"id":"2SJSxso2miStjmSD","label":"gdb online","url":"https://www.onlinegdb.com/myfiles"},{"id":"4TLE0Zx42g98oizP","label":"resources","url":"https://teachyourselfcs.com/"},{"id":"EreCrDtV68QnA7gN","label":"freeCodeCamp","url":"https://www.freecodecamp.org/learn/"},{"id":"7TBjQugjclCoGutn","label":"typing","url":"https://www.typing.com/student/lessons"}]},{"id":"FCWmtBfdy2fCf0Ce","label":"life","bookmarks":[{"id":"i82JSY65rhdymMiO","label":"goodreads","url":"https://www.goodreads.com/"},{"id":"Txpxsaqo3cULVtmQ","label":"calendar","url":"https://calendar.google.com/calendar/u/0/r/month?pli=1"},{"id":"qak4sv8Gygk3BneR","label":"to-do","url":"https://app.todoist.com/app/inbox"},{"id":"i2tDB5DF5WNTkgDh","label":"bank","url":"https://secure.bankofamerica.com/myaccounts/signin/signIn.go?returnSiteIndicator=GAIMW&langPref=en-us&request_locale=en-us&capturemode=N&newuser=false&bcIP=F"}]},{"id":"GsbCrsdr1BtwNLzv","label":"social","bookmarks":[{"id":"oQSMDHqxn4UU5bC3","label":"pinterest","url":"https://www.pinterest.com/"},{"id":"SOPBo6ymDBDXbRsZ","label":"instagram","url":"https://www.instagram.com/direct/inbox/"},{"id":"QODkJ5miQwwf1y6i","label":"youtube","url":"https://www.youtube.com/"},{"id":"QCjdNkKFlvczeemC","label":"gmail","url":"https://mail.google.com/mail/u/0/#inbox"}]},{"id":"HOzkh3KnmxXB9kIj","label":"professional","bookmarks":[{"id":"ZIB1jFQSg4d1Dw3X","label":"github","url":"https://github.com/MarcoGiven"},{"id":"gDi7l5gutQ1GsQpk","label":"webpage","url":"https://marcogiven.com/"},{"id":"OfPPRc12vAeO27Gz","label":"linkedin","url":"https://www.linkedin.com/in/marco-given/"},{"id":"OSg6O5yYgARss052","label":"prof. gmail","url":"https://mail.google.com/mail/u/1/?ogbl#inbox"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
