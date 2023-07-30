import fitz
import string
from glob import glob
from ntpath import basename
from math import inf

def pdfs(path):
  files = glob(path)
  return files

def file_name(path):
  with_ext = basename(path)
  dot_loc = with_ext.find(".")
  name = with_ext[:dot_loc]
  return name

def allpages(document):
  stringify = [page.get_text() for page in document]
  joinify = "".join(stringify)
  return joinify

def view_between_txt(text):
  if all([text.find(num) != -1 for num in ["\n①", "\n②", "\n③", "\n④", "\n⑤"]]):
    return False
  return True

def remove_circles(text):
  for circle in ["( ① )", "( ② )", "( ③ )", "( ④ )", "( ⑤ )", "①", "②", "③", "④", "⑤"]:
    text = text.replace(circle, "")
  return text

def remove_views(text):
  circle1_loc = text.find("①")
  x_circle1 = text[:circle1_loc]
  return x_circle1

def remove_alphabets(text):
  for alphabet in ["(A)", "(B)", "(C)", "(D)", "(a)", "(b)", "(c)", "(d)", "(e)"]:
    text = text.replace(alphabet, "")
  return text

def remove_non_ascii(text):
  ascii_chars = set(string.printable)
  return ''.join(
      filter(lambda x: x in ascii_chars, text)
  )

def problem(document, num):
  num_dot_str = f"\n{num}." if num <= 40 else f"[{num}"
  num_dot_loc = document.find(num_dot_str) + len(num_dot_str)
  x_num_dot = document[num_dot_loc:]

  x_q = None
  if x_num_dot.find("?") > 100 and num <= 40:
    x_q = x_num_dot
  else:
    q_str = "?" if num <= 40 else "."
    q_loc = x_num_dot.find(q_str) + len(q_str)
    x_q = x_num_dot[q_loc:]

  next_num_str = f"\n{num + 1}." if num <= 40 else f"\n{num}."
  next_num_loc = x_q.find(next_num_str)

  copyright_str = "\n이 문제지"
  copyright_loc = x_q.find(copyright_str)

  square_bracket_str = "\n["
  square_bracket_loc = x_q.find(square_bracket_str)
  if square_bracket_loc == -1:
    square_bracket_loc = inf

  full_print = x_q[:min([next_num_loc, copyright_loc, square_bracket_loc])]
  
  asterisk_loc = full_print.find("\n*")
  no_comment = full_print
  if ~asterisk_loc:
    no_comment = full_print[:asterisk_loc]

  x_circles = None
  if view_between_txt(no_comment):
    x_circles = remove_circles(no_comment)
  else:
    x_circles = remove_views(no_comment)

  x_alphabets = remove_alphabets(x_circles)
  x_slashs = x_alphabets.replace("/", "")
  x_3points = x_slashs.replace("[3점]", "")

  x_quotes = x_3points.replace("“", "\"")
  x_quotes = x_quotes.replace("”", "\"")
  x_quotes = x_quotes.replace("’", "'")
  x_quotes = x_quotes.replace("‘", "'")

  x_dash = x_quotes.replace("―", "")
  x_enter = x_dash.replace("\n", " ")
  x_multispace = x_enter.replace("  ", " ")
  x_multispace = x_enter.replace("  ", " ")

  x_non_ascii = remove_non_ascii(x_multispace)

  return x_non_ascii[1:-1]

def main():
  # exams = pdfs("../exams/mock/june/*")
  exams = pdfs("../exams/csat/*")

  for exam in exams:
    exam_name = file_name(exam)
    # json = open(f"../texts/mock/june/{exam_name}.json", "w", encoding="utf-8");
    json = open(f"../texts/csat/{exam_name}.json", "w", encoding="utf-8");

    original_doc = fitz.open(exam)
    document = allpages(original_doc)

    json.write("[\n")

    for num in set(range(18, 46)) - set([42, 44, 45]):
      prob = problem(document, num).replace("\"", "\\\"")

      if len(prob) < 200:
        continue

      print(f"<<<<<{exam_name} / {num}>>>>>")
      print(prob)
      print("-" * 50)


      json.write("{\n")
      json.write(f'"num" : "{num}",\n')
      json.write(f'"content" : "{prob}"\n')
      json.write(f"}}{',' if num < 43 else ''}\n\n")

    json.write("]")
    json.close()
    
main()