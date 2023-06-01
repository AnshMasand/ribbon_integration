import sys
import openai

# Set up OpenAI API credentials
openai.api_key = ""

def generate_code_changes_summary(pr_diff):
    # Generate summary using OpenAI's GPT-3.5 Turbo
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt="Here are all the code changes for a GitHub pull request:\n" + pr_diff + "\n\nPlease summarize the changes:",
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.7
    )
    summary = response.choices[0].text.strip()

    return summary

if __name__ == '__main__':
    # Read the pull request diff from the command line argument
    pr_diff = sys.argv[1]

    # Generate code changes summary
    summary = generate_code_changes_summary(pr_diff)
    print(summary)
    print(pr_diff)
