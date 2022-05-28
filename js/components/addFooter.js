// ========== Footer Component ========== //

export default function addFooter() {
  try {
    const footerContainer = document.querySelector(".footer__container");

    footerContainer.innerHTML = `<h4 class="footer__txt" role="copyright">Darkblade Design &copy;2021</h4>

                                      <ul class="footer__links">
                                          <li>
                                              <a
                                                  href="https://www.behance.net/"
                                                  class="social"
                                                  rel="noopener"
                                                  target="_blank"
                                                  role="link to behance.com"
                                                  ><i class="fab fa-behance-square"></i></a
                                              >
                                          </li>
                                          <li>
                                              <a
                                                  href="https://twitter.com/"
                                                  class="social"
                                                  rel="noopener"
                                                  target="_blank"
                                                  role="link to twitter.com"
                                                  ><i class="fab fa-twitter-square"></i></a
                                              >
                                          </li>
                                          <li>
                                              <a
                                                  href="https://www.instagram.com/"
                                                  class="social"
                                                  rel="noopener"
                                                  target="_blank"
                                                  role="link to Instagram"
                                                  ><i class="fab fa-instagram-square"></i></i></a
                                              >
                                          </li>
                                      </ul>

                                      <div class="footer__bottom" role="site creator name and homepage">
                                          <p>Designed by R.H, at Darkblade-Design.com</p>
                                      </div>`;
  } catch {
    displayMessage("error", "footer not rendered", ".footer__container");
    console.log(error);
  }
}
