use std::str::Lines;

// A = Rock
// B = Paper
// C = Scissors

#[derive(Clone)]
struct Node {
    value: i32,
    beat: Option<Box<Node>>,
}

fn compare_nodes(a: Node, b: Node) -> i32 {
    let mut result = 6;
    if a.value == b.value {
        result = 3;
    } else if a.beat.clone().unwrap().value == b.value {
        result = 0;
    }
    return result + b.value;
}

// create simple linked list
fn create_rools() -> (Node, Node, Node) {
    let mut a = Node {
        value: 1,
        beat: None,
    };

    let mut b = Node {
        value: 2,
        beat: None,
    };

    let mut c = Node {
        value: 3,
        beat: None,
    };
    // create sycled linked list
    a.beat = Some(Box::new(c.clone()));
    b.beat = Some(Box::new(a.clone()));
    c.beat = Some(Box::new(b.clone()));

    // return nodes of linked list
    return (a, b, c);
}

fn get_node(char: &str) -> Node {
    let (a, b, c) = create_rools();
    match char {
        "A" => a,
        "B" => b,
        "C" => c,
        "X" => a,
        "Y" => b,
        "Z" => c,
        _ => panic!("Invalid char {:?}", char),
    }
}
fn get_value(a: &str, b: &str) -> i32 {
    let node_a = get_node(a);
    match b {
        "X" => node_a.beat.unwrap().value,
        "Y" => node_a.value + 3,
        "Z" => node_a.beat.unwrap().beat.unwrap().value + 6,
        _ => panic!("Invalid char {:?}", b),
    }
}

fn solution(lines: Lines) -> i32 {
    let lines = lines.map(|line| line.split(" ").collect::<Vec<&str>>());
    let sum = lines
        .map(|v| compare_nodes(get_node(v[0]), get_node(v[1])))
        .sum();

    return sum;
}

fn solution_part_2(lines: Lines) -> i32 {
    let lines = lines.map(|line| line.split(" ").collect::<Vec<&str>>());
    let sum = lines.map(|v| get_value(v[0], v[1])).sum();

    return sum;
}

fn main() {
    let input = std::fs::read_to_string("../input.txt").unwrap();
    let lines = input.lines();
    let res = crate::solution(lines.clone());
    let res = crate::solution_part_2(lines);
}

#[cfg(test)]
mod tests {
    #[test]
    fn part_1() {
        // let lines = input.lines();
        let lines = "A Y
B X
C Z
"
        .lines();

        // .map(|line| line.split(" ").collect::<Vec<&str>>())
        //print every line
        lines.clone().for_each(|v| println!("{:?}", v));

        let res = crate::solution(lines);
        assert_eq!(res, 15);
    }
    #[test]
    fn part_1_input() {
        let input = std::fs::read_to_string("../input.txt").unwrap();
        let lines = input.lines();

        let res = crate::solution(lines);
        assert_eq!(res, 13268);
    }

    #[test]
    fn part_2() {
        // let lines = input.lines();
        let lines = "A Y
B X
C Z
"
        .lines();

        // .map(|line| line.split(" ").collect::<Vec<&str>>())
        //print every line
        lines.clone().for_each(|v| println!("{:?}", v));

        let res = crate::solution_part_2(lines);
        assert_eq!(res, 12);
    }
    // #[test]
    // fn part_2_input() {
    //     let input = std::fs::read_to_string("../input.txt").unwrap();
    //     let lines = input.lines();

    //     let res = crate::solution_part_2(lines);
    //     assert_eq!(res, 15508);
    // }
}
