from playwright.sync_api import Page, expect, sync_playwright

def test_video_modal(page: Page):
    # 1. Go to home page
    page.goto("http://localhost:3000")

    # 2. Click "Watch the Film"
    page.get_by_role("button", name="Watch the Film").click()

    # 3. Wait for modal content
    iframe = page.locator("iframe[title='TerraMuse Brand Film']")
    expect(iframe).to_be_visible()

    # 4. Check src attribute
    src = iframe.get_attribute("src")
    print(f"Iframe src: {src}")

    expected_id = "pOe5M0GtYZo"
    if expected_id in src:
        print("SUCCESS: Video ID found in src.")
    else:
        print(f"FAILURE: Video ID {expected_id} not found in {src}")
        raise Exception("Incorrect video ID")

    # 5. Take screenshot
    page.screenshot(path="verification/video_modal.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_video_modal(page)
        except Exception as e:
            print(e)
            exit(1)
        finally:
            browser.close()
