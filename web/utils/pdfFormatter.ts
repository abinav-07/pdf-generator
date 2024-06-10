import { rehype } from "rehype";
import rehypeFormat from "rehype-format";
import { fetchBase64Image } from "./base64Img";

export const formatHtml = (input: string) => {
  return String(rehype().use(rehypeFormat).processSync(input))
    .replace(/<\/?(html|head|body)>/g, '')
    .replace(/\n {4}/g, '\n')
    .replace(/^\s+|\s+$/g, '')
};

// Adding default Header Stylings
export const formatHeader = async (headerHTML: string, imageSrc?: string) => {
  // Format Headers as flex to align images
  let base64Img = ""
  if (imageSrc) {
    base64Img = await fetchBase64Image(imageSrc)
  }

  let formattedHTML = `
  <div  style="display:flex;align-items:center; width:100%;font-size: 16px;padding: 10px;margin:auto;">
    <div style="min-width:${imageSrc ? "75%" : "100%"};">
      ${headerHTML}
    </div>
  `
  if (imageSrc) {
    formattedHTML += ` 
      <div>
        <img class="header-image" src="${base64Img}" style="width:100px;height:100px;"/>
      </div>
    `
  }
  formattedHTML += `</div>`
  return formattedHTML
}

// Adding default font-size in case user doesnt add
export const formatFooter = (footerHTML: string) => {
  return `
    <div style="font-size:16px;padding: 10px;">
      ${footerHTML}
    </div>
  `
}